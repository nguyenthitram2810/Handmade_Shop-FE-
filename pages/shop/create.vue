<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>THÔNG TIN CỬA HÀNG</h3>
      <p>Thông tin cửa hàng thể hiện đặc trưng</p>
    </div>

    <div class="container">   
      <a-form-model ref="createForm" :model="createForm" :rules="rules" v-bind="layout">
        <a-form-model-item :wrapper-col="{ ul: 14, offset: 4 }">
          <ul style="color:red; list-style-type: none;">
            <li>{{ error }}</li>
          </ul>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tên cửa hàng" prop="nameShop">
          <a-input v-model="createForm.nameShop" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Mô tả" prop="description">
          <a-input v-model="createForm.description" type="textarea" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Đơn vị vận chuyển" prop="ship">
          <a-select v-model="createForm.ship" mode="multiple">
            <a-select-option v-for="(item, index) in listTransport" :key="index" :value="`${item.id}`">
              {{ item.brand }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <div class="al-text-center mt-5 mb-5">
          <h3>THÔNG TIN THANH TOÁN</h3>
          <p>Thông tin thanh toán chính xác</p>
        </div>

        <a-form-model-item  has-feedback label="Họ và tên" prop="name">
          <a-input v-model="createForm.name" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Tên ngân hàng" prop="bank">
          <a-select v-model="createForm.bank">
            <a-select-option v-for="(bank, index) in listBank" :key="index" :value="`${bank.id}`">
              {{bank.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Mã số thẻ" prop="code">
          <a-input v-model="createForm.code" type="number" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Khu vực" prop="area">
          <a-select  v-model="createForm.area" @change="handleChange">
            <a-select-option v-for="(area, index) in listArea" :key="index" :value="`${area.id}`">
              {{area.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item has-feedback label="Chi nhánh" prop="branch">
          <a-select  v-model="createForm.branch">
            <a-select-option v-for="(branch, index) in listBranch" :key="index" :value="`${branch.id}`">
              {{branch.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('createForm')">
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: ['authentication', 'checkShopActive'],
  data() {
    return {
      user: {},
      listBranch: [],
      listArea: [],
      listBank: [],
      error:'',
      listTransport: [],
      createForm: {
        nameShop: '',
        description: '',
        name: '',
        bank: '',
        code: null,
        area: '',
        branch: '',
        ship: [],
      },
      rules: {
        nameShop: [
          { required: true, message: 'Nhập tên cửa hàng', trigger: 'change' },
          {max: 20, message: 'Độ dài tên cửa hàng nhỏ hơn 20', trigger: 'change'}       
        ],
        description: [{ required: true, message: 'Nhập mô tả cửa hàng', trigger: 'change' }],
        name:  [{ required: true, message: 'Nhập họ và tên', trigger: 'change' }],
        bank:  [{ required: true, message: 'Chọn tên ngân hàng', trigger: 'change' }],
        code:  [{ required: true, message: 'Nhập mã số thẻ', trigger: 'change' }],
        area:  [{ required: true, message: 'Chọn khu vực', trigger: 'change' }],
        branch:  [{ required: true, message: 'Chọn chi nhánh', trigger: 'change' }],
        ship: [{ required: true, message: "Chọn đơn vị vận chuyển của shop", trigger: 'change'}]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 },
      },
    };
  },

  mounted() {
    this.getListBank()
    this.getListArea()
    this.getListTransport()
  },

  methods: {
    async submitForm(formName) {
      this.user = JSON.parse(Cookie.get('user'))
      const token = Cookie.get("token")
      await this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const response = await axios.post(`http://localhost:5000/api/v1/users/shop`, {
              name: this.createForm.nameShop,
              description: this.createForm.description,
              bankAccount: this.createForm.name,
              bankId: this.createForm.bank,
              cardNumber: this.createForm.code,
              districtId: this.createForm.branch,
              thumbnail: this.user.avatar,
              transportIds: this.createForm.ship,
            }, 
            {
              headers: {
                Authorization: 'Bearer ' + token,
              }
            })
            console.log(response)
            if(response.data.status == "200") {
              console.log(response);
              this.user.shopActive = true
              this.user.shop = response.data.data
              Cookie.remove('user')
              this.$store.dispatch('auth/setUser', { user: this.user })
              this.$router.push("/shop/manage/product/list/all")
            }
            else {
              this.error = response.data.message
            }
          }
          catch(e) {
            this.error = e.message
          }
        } else {
          return false;
        }
      });
    },

    async getListBank() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/payments/banks`)
        console.log(response)
        if(response.data.status == "200") {
          this.listBank = response.data.data
        }
        else {
          this.error = response.data.message
        }
      }
      catch(e) {
        this.error = e.message
      }
    },

    async getListArea() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cities`)
        if(response.data.status == "200") {
          this.listArea = response.data.data
        }
        else {
          this.error = response.data.message
        }
      }
      catch(e) {
        this.error = e.message
      }
    },

    async handleChange() {
      try {
        const response =  await axios.get(`http://localhost:5000/api/v1/cities/${this.createForm.area}/districts`)
        if(response.data.status == "200") {
        this.listBranch = response.data.data
        }
        else {
          this.error = response.data.message
        }
      }
      catch(e) {
        this.error = e.message
      }
    },

    async getListTransport() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/transports`)
        console.log(response)
        if(response.data.status == "200") {
          this.listTransport = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST TRANSPORTS ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST TRANSPORTS ERROR',
          description:
            e.message
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>