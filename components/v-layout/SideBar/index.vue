<template>
  <a-layout-sider width="200" style="background: #fff">
    <div class="al-sidebar">
      <a-menu
        style="width: 200px; min-height: 100vh;"
        :default-selected-keys="['1']"
        :open-keys.sync="openKeys"
        mode="inline"
        theme="light"
        @click="handleClick"
      >
        <a-sub-menu key="product" @titleClick="titleClick">
          <span slot="title"><a-icon type="shopping" /><span>Quản lý sản phẩm</span></span>
          <a-menu-item key="1">
            Tất cả sản phẩm
          </a-menu-item>
          <a-menu-item key="2">
            Thêm sản phẩm
          </a-menu-item>
          <a-menu-item key="3">
            Sản phẩm vi phạm
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="order" @titleClick="titleClick">
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
  name: 'SideBar',
  data() {
    return {
      current: ['mail'],
      openKeys: ['product'],
    };
  },
  created() {
        console.log(this.$route.params.id);
    },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
  },
};
</script>

<style scoped>
@import url("./style.scss");
</style>