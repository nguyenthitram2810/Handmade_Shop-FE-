<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      Content
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>>