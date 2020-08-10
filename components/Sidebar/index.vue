<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['sub1']">
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" /><span>User</span></span>
              <a-menu-item key="3">
                Tom
              </a-menu-item>
              <a-menu-item key="4">
                Bill
              </a-menu-item>
              <a-menu-item key="5">
                Alex
              </a-menu-item>
          </a-sub-menu>
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