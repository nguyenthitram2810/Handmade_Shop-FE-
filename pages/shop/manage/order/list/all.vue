<template>
  <a-layout style="padding: 12px 12px 12px" class="product">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Tất cả">
        </a-tab-pane>
        <a-tab-pane key="2" tab="Còn hàng" force-render>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Hết hàng">
        </a-tab-pane>
      </a-tabs>

      <div class="d-flex justify-content-between">
        <a-input-search placeholder="Nhập tên sản phẩm" style="width: 400px" @search="onSearch"/>
      </div>
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
      token: Cookie.get('token'),
    }
  }, 
  methods: {
    onSearch(value) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>