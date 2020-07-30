<template>
    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane to="/" key="1" tab="Tất cả">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Còn hàng" force-render>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Hết hàng">
          </a-tab-pane>
        </a-tabs>
        <div class="d-flex justify-content-between">
          <a-input-search placeholder="Nhập tên sản phẩm" style="width: 400px"/>
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
            title: 'Giá',
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
        const token = Cookie.get("token")
        console.log(token);
        const response = await axios.get('http://localhost:5000/api/v1/users/shop/products?page=1&amount=10', 
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        if(response.data.status == "200") {
          this.data = response.data.data
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
    }
  },
}
</script>

<style scoped>
@import url("./style.scss");
</style>