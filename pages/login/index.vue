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
              <h3>Đăng nhập với Alibabu</h3>
              <p>Alibabu - Thiên đường mua sắm</p>

              <div class="page-links">
                  <nuxt-link to="/login" class="active">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register">Đăng ký</nuxt-link>
              </div>

              <form @submit="loginSubmit">
                  <input v-model="username" class="form-control" type="text" placeholder="Địa chỉ Email" required>
                  <input v-model="password" class="form-control" type="password" placeholder="Mật khẩu" required>
                  <input type="checkbox" id="chk1"><label for="chk1">Lưu đăng nhập</label>
                  <div class="form-button">
                      <button id="submit" type="submit" class="ibtn">Đăng nhập</button> 
                      <nuxt-link to="#">Quên mật khẩu?</nuxt-link>
                  </div>
              </form>

              <div class="other-links">
                  <span>Đăng nhập với</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: 'fullpage',
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    }
  },

  mounted() {
    if(localStorage.getItem("token")) {
      this.$root.$router.push("/");
    }
  },

  methods: {
    loginSubmit(event) {
      event.preventDefault();
      axios.post(`http://localhost:5000/api/v1/signin`, {
        username: this.username,
        name: this.name,
        password: this.password,
      })
      .then(response => {
        const user = JSON.stringify(response.data.results.userInfo);
        localStorage.setItem('user', user);
        localStorage.setItem('token', response.data.results.token)
        this.$root.$router.push("/")
       })
      .catch(e => {
        console.log(e.message);
        this.errors.push(e)
      })
    }
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
@import url("./theme.scss");
</style>
