<template>
  <div>
    <div v-if="verify" class="mt-3 al-text-center">
      <a-spin />
      <p>Verifying, wait some seconds...</p>
    </div>

    <div v-else class="mt-3 al-text-center text-danger" style="color:red;">
      <p>Verify fail! Try again!</p>
      <p>Error: {{error}}</p>
    </div>
  </div>
</template>
<script>


export default {
  layout: "fullpage",
  data() {
    return {
      token: '', 
      verify: true,
      error: ''
    }
  }, 
  async mounted() {
    try {
      this.errors = ''
      this.token = this.$route.query.token
      await this.$store.dispatch('auth/verifyRegister', { token: this.token })
      if(localStorage.getItem('noLogin')) {
        let user = JSON.parse(Cookie.get('user'));
        let id = String(user.id)
        this.$store.dispatch('cart/mergeCart', { userID: id})
      }
      this.$root.$router.push("/")
      // this.$store.state.auth.us
    }
    catch(e) {
      this.verify = false
      this.error = e
    }
  }, 
}
</script>