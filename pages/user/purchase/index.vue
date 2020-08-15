<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <div class="al-sidebar">
        <div class="logo d-flex align-items-center al-border-bottom al-border-right">
          <a-avatar :size="50" :src="user.avatar" />
          <div class="d-flex flex-column pl-2 justify-content-between">
            <h4>{{ user.name }}</h4>
            <nuxt-link to="/user/account/profile">
              <a-button class="mt-1" size="small">
                Chỉnh sửa
              </a-button>
            </nuxt-link>
          </div>
        </div>

        <a-menu
          style="width: 200px; min-height: 100vh;"
          :default-selected-keys="['4']"
          mode="inline"
          theme="light"
        >
          <a-sub-menu key="account">
            <span slot="title"><a-icon type="shopping" /><span>Tài khoản của tôi</span></span>
            <a-menu-item key="1">
              <nuxt-link to="/user/account/profile"> Hồ sơ</nuxt-link>
            </a-menu-item>
            <a-menu-item key="2">
              <nuxt-link to="/user/account/address"> Địa chỉ</nuxt-link>
            </a-menu-item>
            <a-menu-item key="3">
              Đổi mật khẩu
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="4">
            <nuxt-link to="/user/purchase"> <a-icon type="snippets" /> Đơn hàng</nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ margin: 0, minHeight: '280px' }"
      >
        <a-tabs class="white-theme px-4 pt-4" :default-active-key="defaultKey" @change="callback">
          <a-tab-pane key="1" tab="Chờ xác nhận">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Chờ lấy hàng">
          </a-tab-pane>
          <a-tab-pane key="3" tab="Đang giao">
          </a-tab-pane>
          <a-tab-pane key="4" tab="Đã giao">
          </a-tab-pane>
          <a-tab-pane key="5" tab="Đã hủy">
          </a-tab-pane>
        </a-tabs>

        <div v-if="bills.length > 0">
          <div v-for="(item, index) in bills" :key="index">
            <div class="mt-3 p-4 white-theme" >
              <div>
                <nuxt-link class=" al-color-orange" :to="`/shop/${item.shop.slug}`"> <a-icon type="shop" class="pr-3"/>{{ item.shop.name }} </nuxt-link>
              </div>

              <div v-for="(product, index) in item.products" :key="index" class="al-border-top mt-2 py-3 mx-1 row d-flex align-items-center">
                <div class="col-6 d-flex">
                  <img :src="product.product.thumbnail" alt="" class="cart-thumbnail mr-3" >
                  <div class="d-flex flex-column">
                    <p class="cart-name font--regular-2"> {{product.name}}</p>
                    <p> x {{ product.amount}}</p>
                  </div>
                </div>
                <div class="col-6 d-flex justify-content-end al-color-orange">
                  ₫ {{ product.cost}}
                </div>
              </div>
            </div>

            <div class="al-border-dotted-top p-4 al-bg-total d-flex justify-content-end align-items-center">
              <p class="mb-0 mr-3">Tổng số tiền: </p>
              <p class="mb-0 pr-4 font--25 font--regular-2 al-color-orange">₫ {{ item.totalBillAndShip }}</p>
              <nuxt-link :to="`/order/detail/${item.id}`">
                <a-button size="large" class="al-button-cart mr-2" icon="shopping-cart">
                  Xem Chi Tiết Đơn Hàng
                </a-button>
              </nuxt-link>

              <a-button size="large" v-if="item.status == 'delivering'" @click="acceptOrder(item)" class="al-btn-success">
                Xác nhận
              </a-button>
            </div>
          </div>
        </div>
        
        <div v-else class="mt-5">
          <a-empty class="m-auto"/>
        </div>

        <div v-if="bills.length > 0" class="row">
          <div class="al-text-center col-12 mb-3 mt-3">
            <a-pagination :page-size.sync="pageSize"  v-model="current" :total="total" @change="onChange"/>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: ['authentication', 'getState'],
  data() {
    return {
      token: Cookie.get('token'),
      user: this.$store.state.auth.userNow,
      bills: [],
      pageSize: 5,
      current: 1,
      total: 10,
      defaultKey : 1,
      key: 'pending_confirm'
    }
  }, 
  mounted() {
    this.$router.push({ query: { key: this.key, page: this.current, amount: 10} })
    this.getListOrder()
  },
  methods: {
    //Chuyển tab
    callback(key) {
      this.defaultKey = key
      this.current = 1
      if(key == 1) {
        this.key = 'pending_confirm'
      }
      if(key == 2) {
        this.key = 'pending_received_goods'
      }
      if(key == 3) {
        this.key = 'delivering'
      } 
      if(key == 4) {
        this.key = 'delivered'
      } 
      if(key == 5) {
        this.key = 'cancel'
      } 
      this.$router.push({ query: { key: this.key, page: this.current, amount: 10} })
      this.getListOrder()
    },

    async getListOrder() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/orders", {
          params: {
            key: this.key,
            page: this.current,
            amount: 10
          },
          headers: {
                Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          this.bills = response.data.data.rows
          this.total = response.data.data.count
        }
        else {
          this.$notification["error"]({
            message: 'GET ORDER ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET ORDER ERROR',
          description:
            e.message
        });
      }
    },

    onChange(pageNumber) {
      this.current = pageNumber
      this.$router.push({ query: { key: this.key, page: this.current, amount: 10} })
      this.getListOrder()
    },
    async acceptOrder(record) {
      try {
        let status = 'delivered'
        const response = await axios.patch(`http://localhost:5000/api/v1/user/orders/${record.id}?status=${status}`, { status: status}, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          let params = this.$route.query
          this.getAllOrder(params)
          this.$notification['success']({
            message: 'ACCEPT PRODUCT SUCCESS',
            description:
              'Success!',
          });
        }
        else {
          this.$notification['error']({
            message: 'ACCEPT ORDER FAIL',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification['error']({
            message: 'ACCEPT ORDER FAIL',
            description:
              e.message
          });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>