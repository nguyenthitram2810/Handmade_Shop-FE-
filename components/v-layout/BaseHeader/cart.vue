<template>
    <Header 
      v-bind:isSignIn=isSignIn 
      v-bind:user=user
      v-bind:categories=categories
    >
    </Header>
</template>

<script>
import Header from "../../Header";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Header,
  },
  data() {
    return {
      isSignIn: false,
      user: {},
      categories: [
          "Thời trang nam",
          "Thời trang nữ",
          "Túi ví",
          "Giày",
          "Mỹ phẩm",
          "Thủ công mỹ nghệ"
      ]
    }
  },
  created() {
    if(Cookie.get('token') || Cookie.get('user')) {
      this.login = true
      this.user = JSON.parse(Cookie.get('user'))
    }
  }
}
</script>
