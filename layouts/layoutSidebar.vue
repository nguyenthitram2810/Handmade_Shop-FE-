<template>
  <div class="d-flex flex-column" style="background-color: #f1faee;">
    <BaseHeader />
    <a-layout>
      <SideBar />
      <nuxt />
    </a-layout>
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from '~/components/v-layout/BaseHeader'
import BaseFooter from '~/components/v-layout/BaseFooter'
import SideBar from '~/components/v-layout/SideBar'

export default {
  name: 'layoutSidebar',
  components: {
    BaseHeader,
    BaseFooter,
    SideBar
  }
}
</script>