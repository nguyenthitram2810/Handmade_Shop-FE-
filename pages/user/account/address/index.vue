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
          :default-selected-keys="['2']"
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
        <div class="al-border-bottom d-flex align-items-center justify-content-between pb-3">
          <h3>Địa Chỉ Của Tôi</h3>
          <div>
            <a-button @click="showDrawer"> <a-icon type="plus" /> Thêm địa chỉ mới </a-button>
          </div>
        </div>

        <a-drawer
          title="Thêm Địa Chỉ Mới"
          :width="500"
          :visible="visible"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
          >
            <a-form-model-item prop="name">
              <a-input placeholder="Họ và Tên" v-model="form.name"/>
            </a-form-model-item>

            <a-form-model-item prop="phone">
              <a-input placeholder="Số Điện Thoại" v-model="form.phone"/>
            </a-form-model-item>

            <a-form-model-item prop="city">
              <a-select v-model="form.city" placeholder="Tỉnh/Thành Phố" @change="changeCity">
                <a-select-option v-for="(area, index) in listCity" :key="index" :value="`${area.id}`">
                  {{area.name}}
                </a-select-option>  
              </a-select>
            </a-form-model-item>

            <a-form-model-item prop="district">
              <a-select v-model="form.district" placeholder="Quận/Huyện">
                <a-select-option v-for="(district, index) in listDistrict" :key="index" :value="`${district.id}`">
                  {{district.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item prop="location">
              <a-input placeholder="Tòa nhà, Tên đường, Xã,..." v-model="form.location"/>
            </a-form-model-item>
            
            <a-form-model-item>
              <a-button :loading="isLoading" type="primary" @click="onSubmit">
                Create
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-drawer>

        <div v-for="(addr, index) in listAddr" :key="index" class="al-border-bottom py-4">
          <div class="row">
            <div class="col-2 d-flex flex-column">
              <p class="al-color-gray"> Họ và Tên: </p>
              <p class="al-color-gray">Số Điện Thoại: </p>
              <p class="al-color-gray">Địa Chỉ: </p>
            </div>
            <div class="col-4 d-flex flex-column">
              <p class="font--bold"> {{ addr.name}} </p>
              <p class="font--bold"> (+84) {{ addr.phone }} </p>
              <p class="font--bold"> {{ addr.location }}, {{ addr.district.name}}, {{ addr.district.city.name}}</p>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <a-popconfirm
                title="Are you sure delete this task?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm(addr.id)"
              >
                <a-button type="danger">
                  Delete
                </a-button>
              </a-popconfirm>

              <a-button @click="editAddr(addr.id)" class="ml-2 al-btn-success">
                  Edit
              </a-button>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: ['authentication', 'getState'],
  data() {
    let validatePhone = (rule, value, callback) => {
      if (/(0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) {
        callback();
      } else {
        callback(new Error('Số điện thoại không hợp lệ'));
      }
    };
    return {
      isLoading: false,
      token: Cookie.get('token'),
      user: this.$store.state.auth.userNow,
      visible: false,
      listCity: [],
      listDistrict: [],
      listAddr: [],
      form: {
        name: '',
        phone: '', 
        city: undefined,
        district: undefined,
        location: '',
      },
      rules: {
        name: [{ required: true, message: 'Tên không được bỏ trống', trigger: 'change'}],
        phone: [
          {required: true, message: 'Số điện thoại không được bỏ trống', trigger: 'change'},
          { validator: validatePhone}
        ],
        city: [{ required: true, message: 'Tỉnh/Thành Phố không được bỏ trống', trigger: 'change'}],
        district: [{ required: true, message: 'Quận/Huyện không được bỏ trống', trigger: 'change' }],
        location: [{ required: true, message: 'Địa chỉ không được bỏ trống', trigger: 'change' }],
      },
    }
  },
  mounted() {
    this.getListCity()
    this.getListAddr()
  },

  methods: {
    async getListCity() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cities`)
        if(response.data.status == "200") {
          this.listCity = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST CITY FAIL',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST CITY FAIL',
          description:
            e.message
        });
      }
    },

    async changeCity() {
      try {
        this.form.district = []
        const response =  await axios.get(`http://localhost:5000/api/v1/cities/${this.form.city}/districts`)
        if(response.data.status == "200") {
        this.listDistrict = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST DISTRICT FAIL',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST DISTRICT FAIL',
          description:
            e.message
        });
      }
    },

    showDrawer() {
      this.visible = true;
    },

    onClose() {
      this.visible = false;
    },

    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.isLoading = true
          try {
            const response = await axios.post('http://localhost:5000/api/v1/users/addresss', {
              name: this.form.name,
              phone: this. form.phone,
              districtId: this.form.district,
              location: this.form.location
            }, {
              headers: {
                Authorization: 'Bearer ' + this.token,
              }
            })
            console.log(response)
            this.isLoading = false
            if(response.data.status == "200") {
              this.visible = false
              let addr = response.data.data
              this.listAddr.push(addr)
            }
            else {
              this.visible = true
              this.$notification["error"]({
                message: 'ADD ADDRESS FAIL',
                description:
                  response.data.message
              });
            }

          }
          catch(e) {
            this.isLoading = false
            this.visible = true
            this.$notification["error"]({
              message: 'ADD ADDRESS FAIL',
              description:
                e.message
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async getListAddr() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/addresss", {
          headers: {
                Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        if(response.data.status == "200") {
          this.listAddr = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET ADDRESS ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET ADDRESS ERROR',
          description:
            e.message
        });
      }
    },

    // delete address
    async confirm(id) {
      try {
        console.log(id)
        const response = await axios.delete(`http://localhost:5000/api/v1/users/addresss?id=${id}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        if(response.data.status == "200") {
          const index = this.listAddr.findIndex(x => x.id == id)
          this.data.splice(index, 1)
          this.$notification['success']({
            message: 'DELETE ADDRESS',
            description:
              'Success!',
          });
        }
        else {
          this.$notification['error']({
            message: 'DELETE ADDRESS',
            description:
              `Error! ${response.data.message}`,
          });
        }
      }
      catch(e) {
        this.$notification['error']({
          message: 'DELETE ADDRESS',
          description:
            `Error! ${e.message}`,
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>