/* eslint-disable vue/html-self-closing */
<template>
  <header>
    <a-row type="flex" justify="start" class="mx-3">
      <a-col :span="19">
        <a-row class="d-flex justify-content-between align-items-center">
          <a-col :span="6" class="d-flex align-items-center">
            <nuxt-link to="/" style="cursor:pointer;">
              <img src="/images/LogoHandmade.png" class="logo" alt="">
              <img class="ml-3" src="/images/logoName.png" alt="" width="100px" height="100px">
            </nuxt-link>
          </a-col>

          <a-col :span="18" class="search_product">
            <a-input-search placeholder="Tìm kiếm sản phẩm" size="large" style="width: 100%;" />
          </a-col>
        </a-row>
      </a-col>

      <a-col  v-if="login" :span="4" :offset="1" class="my-auto">
        <div class="d-flex justify-content-between align-items-center">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
              <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
              <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
            </a-menu>

            <div style="cursor:pointer;">
              <a-badge :count="99" :overflow-count="10" class="notification">
                <img src="/images/notification.svg" alt="" width="20px">
              </a-badge>
            </div>
          </a-dropdown>

          <div v-if="user.shopActive">
            <nuxt-link to="/shop/manage/product/list/all" class="al-text-color"><img src="/images/online-shopping.svg" alt="" width="20px"></nuxt-link>
          </div>

          <div v-else>
            <nuxt-link to="/shop/create" class="al-text-color"><img src="/images/online-shopping.svg" alt="" width="20px"></nuxt-link>
          </div>

          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="showShop"> <a-icon type="user" />Xem shop</a-menu-item>
              <a-menu-item key="1"> <a-icon type="user" />{{user.name}} </a-menu-item>
              <a-menu-item key="3" @click="loggOut"> <a-icon type="poweroff" />Đăng xuất </a-menu-item>
            </a-menu>

            <div>
              <nuxt-link to="#"  class="al-text-color"><img src="/images/user.svg" alt="" width="20px"></nuxt-link>
            </div>
          </a-dropdown>

          <div>
            <nuxt-link to="/cart"  class="al-text-color"><img src="/images/supermarket.svg" alt="" width="20px"></nuxt-link>
          </div>
        </div>
      </a-col>

      <a-col v-else :span="4" :offset="1" class="my-auto">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <nuxt-link to="/login"  class="al-text-color">Đăng nhập</nuxt-link>
          </div>
          <div>
            <nuxt-link to="/register"  class="al-text-color">Đăng ký</nuxt-link>
          </div>
          <div>
            <nuxt-link to="/cart"  class="al-text-color"><img src="/images/supermarket.svg" alt="" width="20px"></nuxt-link> 
          </div>
        </div>
      </a-col>

      
    </a-row>
    
    <a-menu
      class="al-bg-color al-w-100 category"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '30px' }"
    >
      <a-menu-item key="1" class="al-text-color">
        Thời trang nam
      </a-menu-item>
      <a-menu-item key="2" class="al-text-color">
        Thời trang nữ
      </a-menu-item>
      <a-menu-item key="3" class="al-text-color">
        Túi ví
      </a-menu-item>
      <a-menu-item key="4" class="al-text-color">
        Giày
      </a-menu-item>
      <a-menu-item key="5" class="al-text-color">
        Mỹ phẩm
      </a-menu-item>
      <a-menu-item key="6" class="al-text-color">
        Thủ công mỹ nghệ
      </a-menu-item>
    </a-menu>
  </header>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'BaseHeader',
  data() {
    return {
      login: false,
      user: {},
    }
  },

  created() {
    if(Cookie.get('token')) {
      this.login = true
      this.user = JSON.parse(Cookie.get('user'))
    }
  },

  watch: {
    '$store.state.auth.userNow' : function(value) {
      if(value == null) {
        this.login = false
        this.$router.push(this.$route.query.redirect || '/');
      }
    }
  },

  methods: {
    async loggOut () {
      Cookie.remove('user')
      Cookie.remove('token')
      await this.$store.dispatch('auth/removeUser')
    },
    showShop() {
      this.$router.push(`/shop/${this.user.id}`)
    }
  }
}
</script>
