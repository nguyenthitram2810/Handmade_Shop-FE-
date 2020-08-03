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
            <a-input-search placeholder="Tìm kiếm sản phẩm" size="large" style="width: 100%;" />
          </a-col>
        </a-row>
      </a-col>

      <a-col  v-if="isSignIn" :span="4" :offset="1" class="my-auto">
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
              <a-menu-item v-if="user.shop != null" key="1" @click="showShop"> <a-icon type="user" />Xem shop</a-menu-item>
              <a-menu-item key="1"> <a-icon type="user" />{{user.name}} </a-menu-item>
              <a-menu-item key="3" @click="logOut"> <a-icon type="poweroff" />Đăng xuất </a-menu-item>
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
            <i class="fas fa-sign-in-alt"></i>
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

    <a-menu
      class="al-w-100 category header"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '30px' }"
    >
      <template v-for="(category, index) in categories">
        <a-menu-item
          :key="index"
          class="al-text-color cover-menu-item"
          v-if="index !== 0"
        >
          {{ category }}
        </a-menu-item>
        <a-menu-item
          :key="index"
          class="al-text-color first-menu-item"
          v-else
        >
          {{ category }}
        </a-menu-item>
      </template>
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
    props: ['isSignIn', 'user', 'categories'],
    created() {
      console.log(this.categories)
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
      async logOut () {
        Cookie.remove('user')
        Cookie.remove('token')
        Cookie.remove('shop')
        await this.$store.dispatch('auth/removeUser')
      },
      showShop() {
        this.$router.push(`/shop/${this.user.shop.slug}`)
      }
    }
}
</script>