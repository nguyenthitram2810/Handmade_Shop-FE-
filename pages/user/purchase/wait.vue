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
            <nuxt-link to="/user/purchase/wait"> <a-icon type="snippets" /> Đơn hàng</nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ margin: 0, minHeight: '280px' }"
      >
        <a-tabs class="white-theme px-4 pt-4" default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Chờ xác nhận">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Chờ lấy hàng">
          </a-tab-pane>
          <a-tab-pane key="3" tab="Đang giao">
          </a-tab-pane>
          <a-tab-pane key="4" tab="Đã giao">
          </a-tab-pane>
        </a-tabs>

        <div class="mt-3 p-4 white-theme" v-for="(item, index) in bills" :key="index">
          
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: ['authentication', 'getState'],
  data() {
    return {
      user: this.$store.state.auth.userNow,
      bills: [
        {
          id: 1,
          shop: {
            id: 1,
            name: "Nabi Shop",
            slug: "nabi-shop",
          }, 
          totalBillAndShip: 500000,
          products: [
            {
              count: 2,
              product: {
                id: 1,
                name: "Áo pull",
                price: 200000,
              }
            }
          ]
        },

        {
          id: 1,
          shop: {
            id: 1,
            name: "Nabi Shop",
            slug: "nabi-shop",
          }, 
          totalBillAndShip: 500000,
          products: [
            {
              count: 2,
              product: {
                id: 1,
                name: "Áo pull",
                price: 200000,
              }
            }
          ]
        },
      ]
    }
  }, 
  methods: {
    //Chuyển tab
    callback(key) {
      if(key == 2) {
        this.$router.push('/user/purchase/waitSend')
      }
      if(key == 3) {
        this.$router.push('/user/purchase/shipping')
      } 
      if(key == 4) {
        this.$router.push('/user/purchase/complete')
      } 
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>