<template>
  <div class="d-flex flex-column">
    <BaseHeaderCart/>
    <a-layout>
      <SideBar />
      <nuxt />
    </a-layout>
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeaderCart from '~/components/v-layout/BaseHeader/cart'
import BaseFooter from '~/components/v-layout/BaseFooter'
import SideBar from '~/components/v-layout/SideBar'

export default {
  name: 'layoutSidebar',
  components: {
    BaseHeaderCart,
    BaseFooter,
    SideBar
  }
}
</script>