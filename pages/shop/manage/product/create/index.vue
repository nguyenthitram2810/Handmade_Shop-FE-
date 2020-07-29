<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>THÊM SẢN PHẨM MỚI</h3>
    </div>

    <div class="container">   
      <a-form-model ref="productForm" :model="productForm" :rules="rules" v-bind="layout">
        <a-form-model-item :wrapper-col="{ ul: 14, offset: 4 }">
          <ul style="color:red; list-style-type: none;">
            <li>{{error}}</li>
          </ul>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tên sản phẩm" prop="nameProduct">
          <a-input v-model="productForm.nameProduct" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Loại sản phẩm" prop="productType">
            <a-cascader v-model="productForm.productType" :options="listCate" change-on-select />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Mô tả sản phẩm" prop="description">
          <a-input v-model="productForm.description" type="textarea" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Vật liệu" prop="material">
          <a-select v-model="productForm.material">
            <a-select-option v-for="(item, index) in listMaterial" :key="index" :value="`${item.id}`">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Giá cả" prop="price">
          <a-input addon-before="VNĐ" v-model="productForm.price" type="number" />
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Số lượng" prop="quantity">
          <a-input v-model="productForm.quantity" type="number" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Ảnh sản phẩm" prop="image">
          <div class="row pl-3">
            <div v-for="(img, index) in images" :key="index" class="p-0 previewImg mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" :style="{backgroundImage: 'url(' + img + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}">
              <div class="iconTrash d-flex align-items-center justify-content-center">
                <a-icon class="icon d-flex align-items-center justify-content-center" @click="removeImage(index)" type="delete" />
              </div>
            </div>
            <div v-if="images.length < 8" class="uploadImg d-flex align-items-center justify-content-center mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" @click="$refs.myFile.click()">
              <a-icon type="plus" />
              <input
                ref="myFile" type="file" class="mt-3 d-none" multiple @change="previewFiles"
              >
            </div>
          </div>
        </a-form-model-item>

        <a-form-model-item has-feedback label="Đơn vị vận chuyển" prop="ship">
          <a-select v-model="productForm.ship">
            <a-select-option v-for="(item, index) in listTransport" :key="index" :value="`${item.id}`">
              {{ item.brand }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('productForm')">
            Submit
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
      error:'',
      images: [],
      listCate: [],
      listMaterial: [],
      listTransport: [],
      productForm: {
        nameProduct: '',
        productType: '',
        description: '',
        material: '',
        price: '',
        quantity: '',
      },
      rules: {
        nameProduct: [
          { required: true, message: 'Nhập tên sản phẩm', trigger: 'change' },
          {max: 40, message: 'Độ dài tên sản phẩm nhỏ hơn 40', trigger: 'change'}       
        ],
        productType: [{ required: true, message: 'Chọn loại sản phẩm', trigger: 'change' }],
        description: [{ required: true, message: 'Điền mô tả sản phẩm', trigger: 'change' }],
        material: [{ required: true, message: 'Chọn vật liệu', trigger: 'change' }],
        price: [{ required: true, message: 'Điền giá sản phẩm', trigger: 'change' }],
        quantity: [{ required: true, message: 'Điền số lượng sản phẩm', trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 },
      },
    };
  },

  mounted() {
    this.getListCate()
    this.getListMaterial()
    this.getListTransport()
  },
   methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.productForm.productType);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //api get link image
    previewFiles(event) { 
      for(let i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[`${i}`])
        reader.onload = event => {
        this.images.push(event.target.result)
      }
      }
      
    },
  
    removeImage(index) {
      this.images.splice(index, 1)
    },

    async getListCate() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories`)
        console.log(response)
        if(response.data.status == "200") {
          this.listCate = this.mappingData(response.data.data)
        }
        else {
          this.error = response.data.message
        }
      }
      catch(e) {
        this.error = e.message
      }
    },

    async getListMaterial() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/materials`)
        if(response.data.status == "200") {
        this.listMaterial = response.data.data
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
        if(response.data.status == "200") {
          this.listTransport = response.data.data
        }
        else {
          this.error = response.data.message
        }
      }
      catch(e) {
        this.error = e.message
      }
    },

    mappingData(data) {
      var reformattedArray = data.map(obj =>{ 
        var rObj = {};
        rObj["value"] = obj.id
        rObj["label"] = obj.name
        if(obj.children.length > 0) {
          rObj["children"] = this.mappingData(obj.children)
        }
        return rObj;
      });
      return reformattedArray
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>