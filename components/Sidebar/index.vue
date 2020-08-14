<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
        <a-menu theme="dark" mode="inline">
          <a-menu-item key="1">
            <nuxt-link to="/admin/user"><a-icon type="user" /> User</nuxt-link>
            <!-- <span slot="title"><a-icon type="user" /><span>User</span></span> -->
          </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
  props: ["collapsed"]
}
</script>

<style lang="scss" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>