<template>
    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane to="/" key="1" tab="Tất cả">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="Còn hàng" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Hết hàng">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
      </a-layout-content>
    </a-layout>
</template>

<script>
export default {
    layout: 'layoutSidebar',
    middleware: ['authentication'],
    data() {
    return {};
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
  },
}
</script>

<style scoped>
@import url("./style.scss");
</style>