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
            <h3>Đăng ký với Alibabu</h3>
            <p>Alibabu - Thiên đường mua sắm</p>

            <div class="page-links">
              <nuxt-link to="/login">Đăng nhập</nuxt-link>
              <nuxt-link to="/register" class="active">Đăng ký</nuxt-link>
            </div>

            <a-form-model ref="registerForm" :model="registerForm" :rules="rules">
              <a-form-model-item  has-feedback prop="name" class="m-0 form-validate">
                <a-input :disabled="isDisabled" v-model="registerForm.name" autocomplete="off" placeholder="Tên người dùng"/>
              </a-form-model-item>

              <a-form-model-item has-feedback prop="username"  class="m-0 form-validate">
                <a-input :disabled="isDisabled" v-model="registerForm.username" autocomplete="off" placeholder="Địa chỉ Email"/>
              </a-form-model-item>

              <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                <a-input :disabled="isDisabled" type="password" v-model="registerForm.password" autocomplete="off" placeholder="Mật khẩu"/>
              </a-form-model-item>

              <a-form-model-item has-feedback prop="checkPass" class="m-0 form-validate" >
                <a-input :disabled="isDisabled" type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="Xác nhận mật khẩu"/>
              </a-form-model-item>

              <a-form-model-item  class="form-button mb-0 mt-2">
                <a-button  :loading="isDisabled" class="ibtn" @click="registerSubmit">
                  Đăng ký
                </a-button>
              </a-form-model-item>
            </a-form-model>

            <div class="other-links">
                <span>Đăng ký với</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
            </div>

            <p style="color:red;" class="mt-3 font-15">
              {{error}}
            </p>
          </div>
        </div>
      </div>
    </div>

    <a-button ref="btnWarning" v-show="false" @click="warning">
      Warning
    </a-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'fullpage',
  middleware: 'notAuthentication',
  data() {
    let validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập tên người dùng'));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập mật khẩu'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập xác nhận mật khẩu'));
      } else if (value !== (this.registerForm.password)) {
        callback(new Error("Mật khẩu xác nhận sai"));
      } else {
        callback();
      }
    };
    return {
      loading: '',
      error: '', 
      isDisabled: false,
      registerForm: {
        name: '',
        username: '',
        password: '',
        checkPass: '',
      },
      rules: {
        name:  [{ required: true, validator: validateName }],
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
                min: 10,
                max: 15,
                message: 'Độ dài mật khẩu 10 - 15 ký tự(không kể ký tự trắng)'
              }
            ],
        checkPass: [
              { 
                required: true,
                validator: validatePass2, 
              },
            ],
      },
    }
  },
  methods: {
    registerSubmit(event) {
      this.$refs.registerForm.validate( async valid => {
        if (valid) {
          this.errors = ''
          event.preventDefault()
          this.isDisabled = true
          try {
            const response = await axios.post(`http://localhost:5000/api/v1/signup`, {
              username: this.registerForm.username.trim(),
              name: this.registerForm.name.trim(),
              password: this.registerForm.password.trim(),
            })
            this.$refs.btnWarning.$el.click()
          }
          catch(e) {
            this.error = e.response.data.error
          }
        } else {
          return false;
        }
      });
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
</style>
