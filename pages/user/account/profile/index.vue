<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <div class="al-sidebar">
        <div class="logo d-flex align-items-center al-border-bottom al-border-right">
          <a-avatar :size="50" :src="user.avatar" />
          <div class="d-flex flex-column pl-2 justify-content-between">
            <h4>{{ user.name }}</h4>
            <nuxt-link to="/user/account/profile">
              <a-button class="mt-1" size="small">
                Chỉnh sửa
              </a-button>
            </nuxt-link>
          </div>
        </div>
        <a-menu
          style="width: 200px; min-height: 100vh;"
          :default-selected-keys="['1']"
          mode="inline"
          theme="light"
        >
          <a-sub-menu key="account">
            <span slot="title"><a-icon type="shopping" /><span>Tài khoản của tôi</span></span>
            <a-menu-item key="1">
              <nuxt-link to="/user/account/profile"> Hồ sơ</nuxt-link>
            </a-menu-item>
            <a-menu-item key="2">
              <nuxt-link to="/user/account/address"> Địa chỉ</nuxt-link>
            </a-menu-item>
            <a-menu-item key="3">
              Đổi mật khẩu
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="4">
            <nuxt-link to="/user/purchase/wait"> <a-icon type="snippets" /> Đơn hàng</nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <div class="al-border-bottom">
          <h3>Hồ Sơ Của Tôi</h3>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <a-form-model
          class="pt-3"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <div class="d-flex mb-5">
            <div class="profile-author-thumb m-auto">
					  	<img alt="author" :src="form.avatar">
					  	<div class="edit-dp">
					  		<label class="fileContainer">
					  			<i v-if="upload" class="fa fa-camera"></i>
                  <a-spin v-else>
                    <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                  </a-spin>
					  			<input type="file"  @change="previewFiles">
					  		</label>
					  	</div>
					  </div>
          </div>
          
          <a-form-model-item label="Email" prop="username">
            <a-input disabled v-model="form.username"/>
          </a-form-model-item>

          <a-form-model-item label="Tên" prop="name">
            <a-input v-model="form.name"/>
          </a-form-model-item>

          <a-form-model-item label="Ngày sinh">
            <a-date-picker
              v-model="form.birth"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>

          <a-form-model-item label="Giới tính" prop="sex">
            <a-radio-group v-model="form.sex">
              <a-radio value="male">
                Nam
              </a-radio>
              <a-radio value="female">
                Nữ
              </a-radio>
              <a-radio value="other">
                Khác
              </a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item v-if="form.nameShop" label="Tên cửa hàng" prop="nameShop">
            <a-input v-model="form.nameShop"/>
          </a-form-model-item>

          <a-form-model-item v-if="form.desc" label="Mô tả cửa hàng" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button :loading="isLoading" :disabled="isDisabled" type="primary" @click="onSubmit">
              Lưu
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: ['authentication', 'getState'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      user: {},
      form: {},
      upload: true,
      isDisabled: false,
      isLoading: false,
      rules: {
        username: [{ required: true, message: 'Email không được bỏ trống', trigger: 'change'}],
        name: [{required: true, message: 'Tên không được bỏ trống', trigger: 'change'}],
        nameShop: [{ required: true, message: 'Tên shop không được bỏ trống', trigger: 'change'}],
        desc: [{ required: true, message: 'Mô tả shop không được bỏ trống', trigger: 'change' }],
      },
    }
  },
  mounted() {
    this.mappingForm()
  },

  methods: {
    mappingForm() {
      let user = this.$store.state.auth.userNow
      this.user = user
      var rObj = {};
      rObj["avatar"] = user.avatar
      rObj["username"] = user.username
      rObj["name"] = user.name
      if(user.birth) {
        rObj["birth"] = user.birth
      }
      if(user.sex) {
        rObj["sex"] = user.sex
      }
      if(user.shop != null) {
        rObj["nameShop"] = user.shop.name
        rObj["desc"] = user.shop.description
      }
      this.form = rObj
    },

    async previewFiles(event) {
      try {
        this.upload = false
        this.isDisabled = true
        const data = new FormData()
        data.append('image', event.target.files[0])
        const token = Cookie.get("token")
        const response = await axios.post(`http://localhost:5000/api/v1/gallery`, data, 
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        if(response.data.status == "200") {
          this.form.avatar = response.data.data[0]
        }
        else {
          this.$notification["error"]({
            message: 'UPLOAD AVATAR FAIL',
            description:
              response.data.message
          });
        }
        this.upload = true
        this.isDisabled = false
      }
      catch(e) {
        this.upload = true
        this.isDisabled = false
        this.$notification["error"]({
          message: 'UPLOAD AVATAR FAIL',
          description:
            e.message
        });
      }
    },

    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>