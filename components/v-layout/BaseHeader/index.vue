/* eslint-disable vue/html-self-closing */
<template>
  <header>
    <a-row type="flex" justify="start" class="mx-3">
      <a-col :span="19">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img src="/images/LogoHandmade.png" class="logo" alt="">
            <p class="font_brand ml-3">Alibabu</p>
          </div>
          <div class="search_product">
            <a-input-search placeholder="Tìm kiếm sản phẩm" size="large" style="width: 750px" @search="onSearch" />
          </div>
        </div>
      </a-col>

      <a-col :span="4" :offset="1" class="my-auto">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <nuxt-link to="/login"  class="al-text-color">Đăng nhập</nuxt-link>
          </div>

          <div>
            <nuxt-link to="/register"  class="al-text-color">Đăng ký</nuxt-link>
          </div>
          
          <div>
            <nuxt-link to ="/cart"><a-icon type="shopping-cart" class="al-text-color" style="font-size:18px;" /></nuxt-link> 
          </div>
        </div>
      </a-col>
    </a-row>
    
    <a-menu
      class="al-bg-color al-w-100"
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
export default {
  name: 'BaseHeader',
  props: {},

  methods: {
    loggOut () {
      this.$store.dispatch('auth/signOut', {vue: this})
    }
  }
}
</script>
