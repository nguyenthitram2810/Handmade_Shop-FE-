<template>
    <Header v-bind:isSignIn=isSignIn v-bind:items=items v-bind:user=user>
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
