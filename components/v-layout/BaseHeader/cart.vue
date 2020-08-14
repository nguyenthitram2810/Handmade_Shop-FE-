<template>
    <Header 
      v-bind:isSignIn=isSignIn 
      v-bind:user=user
      v-bind:categories=categories
      v-bind:cart=cart
      v-bind:tempCart=tempCart
      
    >
    </Header>
</template>

<script>
import Header from "../../Header";
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Header,
  },
  data() {
    return {
      isSignIn: false,
      user: {},
      cart: '',
      tempCart: '',
      categories: [],
    }
  },
  created() {
    if(Cookie.get('token') || Cookie.get('user')) {
      this.isSignIn = true
      this.user = JSON.parse(Cookie.get('user'))
      let id = String(this.user.id)
      if(localStorage.getItem(id)) {
      this.cart = this.$store.state.cart.amountProduct
    }
    }
    if(localStorage.getItem('noLogin')) {
      this.tempCart = this.$store.state.cart.amountProductNoLogin
    }
  }, 

  mounted() {
    this.getCategories()
  }, 

  methods: {
    async getCategories() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories`)
        if(response.data.status == "200") {
          this.categories = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST CATEGORIES ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST CATEGORIES ERROR',
          description:
            e.message
        });
      }
    },

    // onSearch(value) {
    //   console.log(value)
    // }
  }
}
</script>
