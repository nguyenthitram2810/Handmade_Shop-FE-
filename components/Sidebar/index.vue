<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
        <a-menu theme="dark" mode="inline">
          <a-menu-item key="1">
            <a @click="pushUser()"><a-icon type="user" /> User</a>
          </a-menu-item>

          <a-menu-item key="2">
            <a @click="pushShop()"><a-icon type="shop" /> Shop</a>
          </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
  props: ["collapsed"],
  methods: {
    pushUser() {
      this.$router.push({path: '/admin/user', query: { page: 1, amount: 10}})
    },
    pushShop() {
      this.$router.push({path: '/admin/shop', query: { page: 1, amount: 10}})
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>