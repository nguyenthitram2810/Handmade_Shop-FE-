<template>
    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-tabs default-active-key="1" @change="callback">
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
        <a-table class="pt-4" :columns="columns" :data-source="data" bordered>
          <span slot="soldAmount" slot-scope="text, record">
            <p>{{ record.restAmount -  record.amount }}</p>
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
    middleware: ['authentication'],
    data() {
      return {
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
      };
  },
  mounted() {
    this.getAllproduct();
  },
  methods: {
    callback(key) {
      if(key == 2) {
        this.$router.push('/shop/manage/product/list/active')
      }
      if(key == 3) {
        this.$router.push('/shop/manage/product/list/soldout')
      }
    },

    async getAllproduct() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/shop/products?page=1&amount=10', 
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        if(response.data.status == "200") {
          if(response.data.data[0]) {
            this.data = response.data.data[0].products
          }
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
      try {
        console.log(value)
        const response = await axios.get(`http://localhost:5000/api/v1/users/shop/products?key=search&value=${value}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          if(response.data.data[0]) {
            this.data = response.data.data[0].products
          }
        }
        else {
          this.$notification["error"]({
            message: 'SEARCH PRODUCT ERROR',
            description:
              response.data.message
          });
        }
        console.log(response)
      }
      catch(e) {
        this.$notification["error"]({
          message: 'SEARCH PRODUCT ERROR',
          description:
            e.message
        });
      }
    }
  },
}
</script>

<style scoped>
@import url("./style.scss");
</style>