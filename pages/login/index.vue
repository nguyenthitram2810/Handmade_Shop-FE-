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

              <a-form-model ref="loginForm" :model="loginForm" :rules="rules">
                <a-form-model-item has-feedback prop="username"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="loginForm.username" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="loginForm.password" autocomplete="off" placeholder="Mật khẩu"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="loginSubmit">
                   Đăng nhập
                  </a-button>
                </a-form-model-item>
              </a-form-model>

              <p style="color:red;" class="mt-3 font-15">
                {{error}}
              </p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'fullpage',
  middleware: 'notAuthentication',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập mật khẩu'));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      error: '',
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username:  [
          {
            type: 'email',
            message: 'Email không hợp lệ',
          },
          {
            required: true,
            message: 'Nhập địa chỉ email',
          },
        ],
        password: [
          { 
            required: true,
            validator: validatePass, 
          },
          {
            min: 6,
            message: 'Độ dài mật khẩu > 6 ký tự(không kể ký tự trắng)'
          }
        ],
      }
    }
  },
  methods: {
    async loginSubmit(event) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.errors = ''
          event.preventDefault()
          this.isDisabled = true
          try {
            await this.$store.dispatch('auth/login', {username: this.loginForm.username, password: this.loginForm.password})
            if(localStorage.getItem('noLogin')) {
              let user = JSON.parse(Cookie.get('user'));
              let id = String(user.id)
              this.$store.dispatch('cart/mergeCart', { userID: id, user: user, })
            }
            this.$root.$router.push("/")
          }
          catch(e) {
            this.isDisabled = false
            this.error = e
          }
        } else {
          return false;
        }
      });
    }
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
</style>
