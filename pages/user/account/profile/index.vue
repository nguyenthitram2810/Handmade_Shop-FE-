<template>
  <a-layout-sider width="200" style="background: #fff">
    <div class="al-sidebar">
      <div class="logo d-flex align-items-center al-border-bottom al-border-right">
        <a-avatar :size="50" src="http://res.cloudinary.com/dhbk/image/upload/v1596342616/gallery/yrpbv9tskrdnqiyitlrk.jpg" />
        <div class="d-flex flex-column pl-2 justify-content-between">
          <h4>nguyen tram</h4>
          <nuxt-link to="/">
            <a-button class="mt-1" size="small">
              Chỉnh sửa
            </a-button>
          </nuxt-link>
        </div>
      </div>
      <a-menu
        style="width: 200px; min-height: 100vh;"
        :default-selected-keys="['1']"
        mode="inline"
        theme="light"
        @click="handleClick"
      >
        <a-sub-menu key="product">
          <span slot="title"><a-icon type="shopping" /><span>Tài khoản của tôi</span></span>
          <a-menu-item key="1">
            Hồ sơ
          </a-menu-item>
          <a-menu-item key="2">
            <nuxt-link to="/shop/manage/product/create"> Địa chỉ</nuxt-link>
          </a-menu-item>
          <a-menu-item key="3">
            Đổi mật khẩu
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="order">
          <span slot="title"><a-icon type="snippets" /><span>Quản lý đơn hàng</span></span>
          <a-menu-item key="5">
            Tất cả
          </a-menu-item>
          <a-menu-item key="6">
            Xử lý đơn hàng loạt
          </a-menu-item>
          <a-menu-item key="7">
            Trả hàng / Hoàn tiền
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="revenue">
          <span slot="title"><a-icon type="wallet" /><span>Tài chính</span></span>
          <a-menu-item key="8">
            Doanh thu
          </a-menu-item>
          <a-menu-item key="9">
            Tài khoản ngân hàng
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="shop">
          <span slot="title"><a-icon type="shop" /><span>Quản lý shop</span></span>
          <a-menu-item key="10">
            Đánh giá shop
          </a-menu-item>
          <a-menu-item key="11">
            Hồ sơ shop
          </a-menu-item>
          <a-menu-item key="12">
            Địa chỉ
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
export default {
    methods: {
      handleClick(e) {
        if(e.key == 1) {
          this.$router.push('/shop/manage/product/list/all')
        }
        if(e.key == 2) {
          this.$router.push('/shop/manage/product/create')
        }
      },
    }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>