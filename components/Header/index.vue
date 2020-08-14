<template>
      <a-row type="flex" justify="start">
      <a-col :span="18">
        <a-row class="d-flex justify-content-between align-items-center px-3">
          <a-col :span="6" class="d-flex align-items-center">
            <nuxt-link to="/" style="cursor:pointer;">
              <img src="/images/LogoHandmade.png" class="logo" alt="">
              <img class="ml-3" src="/images/logoName.png" alt="" width="100px" height="100px">
            </nuxt-link>
          </a-col>

          <a-col :span="16" class="search_product">
            <a-input-search placeholder="Tìm kiếm sản phẩm" size="large" style="width: 100%;" @search="onSearch" />
          </a-col>
        </a-row>
      </a-col>

      <a-col  v-if="isSignIn" :span="4" :offset="1" class="my-auto">
        <div class="d-flex justify-content-between align-items-center">
          <div v-if="user.shopActive">
            <nuxt-link to="/shop/manage/product/list" class="al-text-color"><img src="/images/online-shopping.svg" alt="" width="20px"></nuxt-link>
          </div>

          <div v-else>
            <nuxt-link to="/shop/create" class="al-text-color"><img src="/images/online-shopping.svg" alt="" width="20px"></nuxt-link>
          </div>

          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item v-if="user.shop != null" key="1" @click="showShop"> <a-icon type="user" />Xem shop</a-menu-item>
              <a-menu-item key="1" @click="showUser"> <a-icon type="user" />{{user.name}} </a-menu-item>
              <a-menu-item key="3" @click="logOut"> <a-icon type="poweroff" />Đăng xuất </a-menu-item>
            </a-menu>

            <div>
              <nuxt-link to="#"  class="al-text-color"><img src="/images/user.svg" alt="" width="20px"></nuxt-link>
            </div>
          </a-dropdown>

          <div>
            <a-badge :count="cart" :overflow-count="10" class="notification">
              <nuxt-link to="/cart"  class="al-text-color"><img src="/images/supermarket.svg" alt="" width="20px"></nuxt-link>
            </a-badge>
          </div>
        </div>
      </a-col>

      <a-col v-else :span="4" :offset="1" class="my-auto">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <i class="fas fa-sign-in-alt"></i>
            <nuxt-link to="/login"  class="al-text-color">Đăng nhập</nuxt-link>
          </div>
          <div>
            <nuxt-link to="/register"  class="al-text-color">Đăng ký</nuxt-link>
          </div>
          <div>
            <a-badge :count="tempCart" :overflow-count="10" class="notification">
              <nuxt-link to="/cart"  class="al-text-color"><img src="/images/supermarket.svg" alt="" width="20px"></nuxt-link>
            </a-badge>
          </div>
        </div>
      </a-col>

    <a-menu
      class="al-w-100 category header"
      mode="horizontal"
      :style="{ lineHeight: '30px', 'z-index': '2' }"
    >
      <a-menu-item  v-for="(cate, index) in categories" :key="index"> 
        <a-dropdown placement="bottomCenter">
          <a-menu-item
            key="1"
            class="al-text-color cover-menu-item"
          >
            {{ cate.name}}
          </a-menu-item>
          <a-menu slot="overlay" class="w-100">
            <a-menu-item v-for="(subCate, index) in cate.children" :key="index">
              <nuxt-link :to="`/categories/${subCate.slug}`"> {{ subCate.name }} </nuxt-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-menu-item>
    </a-menu>

      <slot></slot>
    </a-row>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: "header",
    props: ['isSignIn', 'user', 'categories', 'cart', 'tempCart'],
    watch: {
      '$store.state.auth.userNow' : function(value) {
        if(value == null) {
          this.isSignIn = false
          this.$router.push(this.$route.query.redirect || '/');
        }
      },
      '$store.state.cart.listProduct' : function(value) {
        this.cart = this.$store.state.cart.amountProduct
      },
      '$store.state.cart.listProductNoLogin' : function(value) {
        this.tempCart = this.$store.state.cart.amountProductNoLogin
      }
    },
    methods: {
      async logOut () {
        Cookie.remove('user')
        Cookie.remove('token')
        await this.$store.dispatch('auth/removeUser')
        await this.$store.dispatch('cart/removeAll')
      },
      showShop() {
        this.$router.push(`/shop/${this.user.shop.slug}`)
      },
      showUser() {
        this.$router.push('/user/account/profile')
      },
      onSearch(value) {
        //this.$emit('on-search', value)
        this.$router.push({path: '/products', query: { page: 1, amount: 12, key: 'search', value: value}})
      },
    }
}
</script>