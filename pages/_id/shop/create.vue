<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>THÔNG TIN CỬA HÀNG</h3>
      <p>Thông tin cửa hàng thể hiện đặc trưng</p>
    </div>

    <div class="container">   
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item :wrapper-col="{ ul: 14, offset: 4 }">
          <ul style="color:red; list-style-type: none;" v-for="item in errors" v-bind:key="item">
            <li>{{item.message}}</li>
          </ul>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tên cửa hàng" prop="nameShop">
          <a-input v-model="ruleForm.nameShop" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Mô tả" prop="description">
          <a-input v-model="ruleForm.description" type="textarea" />
        </a-form-model-item>

        <div class="al-text-center mt-5">
          <h3>THÔNG TIN THANH TOÁN</h3>
          <p>Thông tin thanh toán chính xác</p>
        </div>

        <a-form-model-item  has-feedback label="Họ và tên" prop="name">
          <a-input v-model="ruleForm.name" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Tên ngân hàng" prop="bank">
          <a-select v-model="ruleForm.bank">
            <a-select-option v-for="bank in listBank" :key="bank.id" :value="`${bank.id}`">
              {{bank.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Mã số thẻ" prop="code">
          <a-input v-model="ruleForm.code" type="number" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Khu vực" prop="area">
          <a-select  v-model="ruleForm.area" @change="handleChange">
            <a-select-option v-for="area in listArea" v-bind:key="area" :value="`${area.id}`">
              {{area.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item has-feedback label="Chi nhánh" prop="branch">
          <a-select  v-model="ruleForm.branch">
            <a-select-option v-for="branch in listBranch" v-bind:key="branch" :value="`${branch.id}`">
              {{branch.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            Submit
          </a-button>

          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            Reset
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import axios from "axios"

export default {
  data() {
    return {
      user: {},
      listBranch: [],
      listArea: [],
      listBank: [],
      errors:[],
      ruleForm: {
        nameShop: '',
        description: '',
        name: '',
        bank: '',
        code: null,
        area: '',
        branch: '',
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
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 },
      },
    };
  },

  mounted() {
    this.getListBank();
    this.getListArea();
  },

  methods: {
    async submitForm(formName) {
      this.user = JSON.parse(localStorage.getItem("user"))
      const token = localStorage.getItem("token")
      console.log(this.user);
      console.log(this.user.avatar);
      console.log(token);
      
      await this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const response = await axios.post(`http://localhost:5000/api/v1/users/shop`, {
              name: this.ruleForm.nameShop,
              description: this.ruleForm.description,
              bankAccount: this.ruleForm.name,
              bankId: this.ruleForm.bank,
              cardNumber: this.ruleForm.code,
              districtId: this.ruleForm.branch,
              thumbnail: this.user.avatar,
            }, 
            {
              headers: {
                Authorization: 'Bearer ' + token,
              }
            })
            console.log(response.data.results);
            console.log();
            this.$root.$router.push(`/${this.user.id}/shop/product/list`)
          }
          catch(e) {
            this.errors.push(e)
          }
        } else {
          alert("Shop tạo rồi")
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async getListBank() {
      this.errors = []
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/payments/banks`)
        this.listBank = response.data.results
      }
      catch(e) {
        this.errors.push(e)
      }
    },

    async getListArea() {
      this.errors = []
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/cities`)
        this.listArea = response.data.results
      }
      catch(e) {
        this.errors.push(e)
      }
    },

    async handleChange() {
      this.errors = []
      try {
        const response =  await axios.get(`http://localhost:5000/api/v1/cities/${this.ruleForm.area}/districts`)
        this.listBranch = response.data.results
      }
      catch(e) {
        this.errors.push(e)
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>