/* eslint-disable vue/html-self-closing */
<template>
  <a-button type="primary" class="ant-btn">
      Primary
  </a-button>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
export default {
  name: 'Button',
  props: {},

  methods: {
    loggOut () {
      this.$store.dispatch('auth/signOut', {vue: this})
    }
  }
}
</script>
