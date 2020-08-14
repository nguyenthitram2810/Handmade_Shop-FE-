<template>
  <a-layout>
    <a-layout-header id="admin-header">
      <a-row type="flex">

        <!-- Icon trigger sidebar -->
        <a-col :span="2">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleSidebar"
          />
        </a-col>

        <!-- Searh item -->
        <a-col :span="12">
          <SearchItem
            :placeholder="searchItem.placeholder"
            :size="searchItem.size"
            :value="searchItem.value"
            @search="click"
            @change="change"
          />
        </a-col>

        <!-- User dropdown -->
        <a-col :span="1" class="userCover">
          <template>
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="user" /> 
              </a>
              <a-menu slot="overlay">
                <a-menu-item class="sub-dropdown">
                  <nuxt-link to="">Profile</nuxt-link>
                </a-menu-item>
                <a-menu-item  class="sub-dropdown">
                  <nuxt-link to="">Log out</nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-col>
      </a-row>
    </a-layout-header>
    <nuxt/>
  </a-layout>
</template>

<script>
import SearchItem from "@/components/SearchItem";

export default {
  components: {
    SearchItem,
  },
  props: ["collapsed"],
  data() {
    return {
      searchItem: {
        placeholder: "You want to looking for ...",
        size: "medium",
        value: ""
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    search() {

    },
    change() {

    },
  },
}
</script>

<style lang="scss" scoped>
.userCover {
  margin-left: auto;
  margin-right: 0;
}

.sub-dropdown {
  width: 100px;
}

#admin-header .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#admin-header .trigger:hover {
  color: #1890ff;
}

#admin-header {
  background: #fff;
  padding: 0
}
</style>