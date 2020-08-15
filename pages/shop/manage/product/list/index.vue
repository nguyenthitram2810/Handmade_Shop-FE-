<template>
    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-tabs :default-active-key="defaultKey" @change="callback">
          <a-tab-pane key="1" tab="Tất cả">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Còn hàng" force-render>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Hết hàng">
          </a-tab-pane>
        </a-tabs>

        <div class="d-flex justify-content-between">
          <a-input-search placeholder="Nhập tên sản phẩm" style="width: 400px" @search="onSearch"/>
          <nuxt-link to="/shop/manage/product/create">
            <a-button  icon="plus" class="bg-button-orange al-color-white">
              Thêm sản phẩm
            </a-button>
          </nuxt-link>
        </div>
        
        <a-table class="pt-4" :columns="columns" :data-source="data" @change="handleTableChange" :loading="loading" :pagination="pagination" bordered>
          <span slot="soldAmount" slot-scope="text, record">
            <p>{{ record.sold}}</p>
          </span>
          <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
            >
              <a-button type="danger">
                Delete
              </a-button>
            </a-popconfirm>

            <nuxt-link :to="`/shop/manage/product/edit/${record.id}`"> 
              <a-button class="al-btn-success">
                Edit
              </a-button>
            </nuxt-link>
            
            <nuxt-link :to="`/shop/product/detail/${record.slug}`"> 
              <a-button type="primary">
                View Detail
              </a-button>
            </nuxt-link>
          </span>
        </a-table>
      </a-layout-content>
    </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'layoutSidebar',
  middleware: ['authentication', 'getState'],
  data() {
    return {
      loading: false,
      token: Cookie.get("token"),
      columns: [
          {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Mô tả sản phẩm',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Kho hàng',
            key: 'restAmount',
            dataIndex: 'restAmount',
          },
          {
            title: 'Đã bán',
            key: 'soldAmount',
            scopedSlots: { customRender: 'soldAmount' },
          },
          {
            title: '',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
      ],
      data: [],
      pagination: {
        total: 0,
        current: 1,
      },
      defaultKey: '',
    };
  },
  mounted() {
    this.defaultKey = 1
    this.$router.push({ query: {page: this.pagination.current, amount: 10} })
    this.getAllproduct({page: this.pagination.current, amount: 10});
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.loading = true

      let pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      let params = this.$route.query
      params.page = this.pagination.current
      console.log(this.pagination);
      
      this.$router.push({ query: params })
      this.getAllproduct(params)
      this.loading = false
    },

    callback(key) {
      if(key == 1) {
        let params = {
          page: 1, 
          amount: 10,
        }
        console.log(params)
        this.$router.push({ query: params })
        this.getAllproduct(params)
      }
      if(key == 2) {
        let params = {
          page: 1, 
          amount: 10,
          key: 'inventory'
        }
        this.$router.push({ query: params })
        this.getAllproduct(params)
      }
      if(key == 3) {
        let params = {
          page: 1, 
          amount: 10,
          key: 'sold-out'
        }
        this.$router.push({ query: params })
        this.getAllproduct(params)
      }
      this.defaultKey = key
    },

    async getAllproduct(params) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/shop/products`,
        {
          params: params,
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.data = response.data.data.rows
          let pagination = { ...this.pagination }
          pagination.total = response.data.data.count
          pagination.current = params.page
          this.pagination = pagination
          console.log(this.pagination)
        }
        else {
          this.$notification["error"]({
            message: 'GET PRODUCT ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET PRODUCT ERROR',
          description:
            e.message
        });
      }
    },

    async confirm(id) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/v1/users/shop/products/${id}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        if(response.data.status == "200") {
          const index = this.data.findIndex(x => x.id == id)
          this.data.splice(index, 1)
          this.$notification['success']({
            message: 'DELETE PRODUCT',
            description:
              'Success!',
          });
        }
        else {
          this.$notification['error']({
            message: 'DELETE PRODUCT',
            description:
              `Error! ${response.data.message}`,
          });
        }
      }
      catch(e) {
        this.$notification['error']({
          message: 'DELETE PRODUCT',
          description:
            `Error! ${e.message}`,
        });
      }
    },

    async onSearch(value) {
      console.log(this.$route)
      let params = {
        page: 1, 
        amount: 10, 
        key: 'search',
        value: value,
      }
      if(this.$route.query.filter) {
        params.filter = this.$route.query.filter
      }
      if(this.$route.query.key) {
        if(this.$route.query.key != 'search') {
          params.filter = this.$route.query.key
        }
      }
      this.getAllproduct(params)
      this.$router.push({ query: params })
    }
  },
}
</script>

<style scoped>
@import url("./style.scss");
</style>