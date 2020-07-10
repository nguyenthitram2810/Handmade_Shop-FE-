<template>
  <div>
    <div v-if="verify" class="mt-3 al-text-center">
      <a-spin />
      <p>Verifying, wait some seconds...</p>
    </div>

    <div v-else class="mt-3 al-text-center text-danger">
      <p>Verify fail! Try again!</p>
      <p>List errors:</p>
      {{errors}}
    </div>
  </div>
</template>
<script>
import axios from "axios"

export default {
  layout: "fullpage",

  data() {
    return {
      token: '', 
      verify: true,
      errors: []
    }
  },

  async mounted() {
    this.errors = []
    this.token = this.$route.query.token
    await axios.get(`http://localhost:5000/api/v1/users/mail/verify?token=${this.token}`)
    .then(response => {
      const user = JSON.stringify(response.data.results.userInfo);
      localStorage.setItem('user', user);
      localStorage.setItem('token', response.data.results.token)
      this.$root.$router.push("/")
     })
    .catch(e => {
      this.verify = false
      this.errors.push(e)
    })
  }, 
}
</script>