<template>
  <div class="cover-cart">
    <div class="container my-5">
      <div class="white-theme p-4">
        <h3 class="al-color-orange ">Thông Tin Khách Hàng</h3>

      </div>

      <div class="white-theme p-4">
        <h3 class="al-color-orange ">Thông Tin Đơn Hàng</h3>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'cart',
  middleware: ['authentication','getState']
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>