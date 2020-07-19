<template>
    <a-layout style="padding: 12px 12px 12px">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        content
      </a-layout-content>
    </a-layout>
</template>

<script>
export default {
    layout: 'layoutSidebar',
    middleware: ['authentication'],
}
</script>
<style lang="scss" scoped>

</style>