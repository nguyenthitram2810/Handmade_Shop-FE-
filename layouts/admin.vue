<template>
  <a-layout>
    <SidebarAdmin :collapsed="collapsed"/>
    <AdminHeader :collapsed="collapsed" @toggleSidebar="collapsed = !collapsed">
      <nuxt/>
    </AdminHeader>
    <BaseFooter/>
  </a-layout>
</template>

<script>
import SidebarAdmin from '@/components/Sidebar/index';
import AdminHeader from '@/components/Header/admin';
export default {
  components: {
    SidebarAdmin,
    AdminHeader,
  },
  data() {
    return {
      collapsed: false,
    }
  }
}
</script>

<style>

</style>