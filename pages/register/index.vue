<template>
  <div class="form-body">
    <div class="website-logo">
      <nuxt-link to="/">
        <div class="logo">
          <img class="logo-size" src="/images/logoName.png" alt="">
        </div>
      </nuxt-link>
    </div>

    <div class="row">
      <div class="img-holder">
          <div class="bg"></div>
          <div class="info-holder">
          </div>
      </div>

      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Đăng ký với Alibabu</h3>
            <p>Alibabu - Thiên đường mua sắm</p>

            <div class="page-links">
              <nuxt-link to="/login">Đăng nhập</nuxt-link>
              <nuxt-link to="/register" class="active">Đăng ký</nuxt-link>
            </div>

            <form @submit="registerSubmit">
              <input v-model="name" class="form-control" type="text" placeholder="Tên người dùng" required>
              <input v-model="username" class="form-control" type="email" placeholder="Địa chỉ Email" required>
              <input v-model="password" class="form-control" type="password" placeholder="Mật khẩu" required>
              <div class="form-button">
                <button id="submit" type="submit" class="ibtn">Đăng ký</button>
              </div>
            </form>

            <div class="other-links">
                <span>Đăng ký với</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
            </div>
            <li style="color:white;" v-for="error of errors" v-bind:key="error">
              {{error}}
            </li>
          </div>
        </div>
      </div>
    </div>

    <a-button ref="btnWarning" v-show="visible" @click="warning">
      Warning
    </a-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'fullpage',
  data() {
    return {
      name: '',
      username: '',
      password: '',
      errors: [], 
      visible: false,
    }
  },

  mounted() {
    if(localStorage.getItem("token")) {
      this.$root.$router.push("/");
    }
  },

  methods: {
    registerSubmit(event) {
      this.errors = []
      event.preventDefault()
      axios.post(`http://localhost:5000/api/v1/signup`, {
        username: this.username,
        name: this.name,
        password: this.password,
      })
      .then(response => {
        this.$refs.btnWarning.$el.click()
       })
      .catch(e => {
        console.log(e.message)
        this.errors.push(e)
      })
    },
    warning() {
      this.$warning({
        title: 'Verify',
        content: 'Login email and verify account',
      });
    },
  }
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
@import url("./theme.scss");
</style>
