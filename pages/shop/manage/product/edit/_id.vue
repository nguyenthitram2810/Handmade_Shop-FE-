<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>CHỈNH SỬA SẢN PHẨM</h3>
    </div>

    <div class="container">   
      <a-form-model ref="productForm" :model="productForm" :rules="rules" v-bind="layout">
        <a-form-model-item :wrapper-col="{ ul: 14, offset: 4 }">
          <ul style="color:red; list-style-type: none;">
            <li>{{error}}</li>
          </ul>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tên sản phẩm" prop="name">
          <a-input v-model="productForm.name" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Loại sản phẩm" prop="productType">
            <a-cascader v-model="productForm.productType" :options="listCate" change-on-select />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Mô tả sản phẩm" prop="description">
          <a-input v-model="productForm.description" type="textarea" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Vật liệu" prop="material" >
          <a-select v-model="productForm.material" mode="multiple">
            <a-select-option v-for="(item, index) in listMaterial" :key="index" :value="`${item.id}`">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Giá cả" prop="price">
          <a-input :min="0" addon-before="VNĐ" v-model="productForm.price" type="number" />
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Trọng lượng" prop="weight">
          <a-input :min="0" addon-before="gam" v-model="productForm.weight" type="number" />
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tồn kho" prop="quantity">
          <a-input :min="0" v-model="productForm.quantity" type="number" />
        </a-form-model-item>

        <a-form-model-item label="Ảnh sản phẩm" prop="images">
          <div class="row pl-3">
            <div v-for="(img, index) in showImages" :key="index" class="p-0 previewImg mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" :style="{backgroundImage: 'url(' + img + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}">
              <div class="iconTrash d-flex align-items-center justify-content-center">
                <a-icon class="icon d-flex align-items-center justify-content-center" @click="removeImage(index)" type="delete" />
              </div>
            </div>
            <div v-if="showImages.length < 5" class="uploadImg d-flex align-items-center justify-content-center mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" @click="$refs.image.click()">
              <a-icon v-if="upload" type="plus" />
              <a-spin v-else>
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
              </a-spin>
              <input
                ref="image" name="image" type="file" class="mt-3 d-none" multiple @change="previewFiles"
              >
            </div>
          </div>
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
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: 'authentication',
  data() {
    return {
      error:'',
      upload: true,
      token: Cookie.get("token"),
      listCate: [],
      listMaterial: [],
      showImages:[],
      amount: 0,
      productForm: {
        name: '',
        productType: '',
        description: '',
        material: [],
        price: '',
        quantity: '',
        images: [],
        restAmount: '',
        weight: '',
      },
      rules: {
        name: [
          { required: true, message: 'Nhập tên sản phẩm', trigger: 'change' },
          {max: 40, message: 'Độ dài tên sản phẩm nhỏ hơn 40', trigger: 'change'}       
        ],
        productType: [{ required: true, message: 'Chọn loại sản phẩm', trigger: 'change' }],
        description: [{ required: true, message: 'Điền mô tả sản phẩm', trigger: 'change' }],
        material: [{ required: true, message: 'Chọn vật liệu', trigger: 'change' }],
        price: [{ required: true, message: 'Điền giá sản phẩm', trigger: 'change' }],
        quantity: [{ required: true, message: 'Điền số lượng sản phẩm', trigger: 'change' }],
        images: [{ required: true, message: 'Chọn ảnh sản phẩm', trigger: 'change' }],
        weight: [{required: true, message: 'Điền trọng lượng sản phẩm', trigger: 'change'}]
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
    this.getProduct()
  },
   methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const user = JSON.parse(Cookie.get("user"))
            console.log(this.productForm);
            const response = await axios.put(`http://localhost:5000/api/v1/users/shop/products/${this.$route.params.id}`, 
            {
              shopId: user.shop.id,
              name: this.productForm.name,
              categoryId: this.productForm.productType[this.productForm.productType.length - 1],
              description: this.productForm.description,
              price: this.productForm.price,
              restAmount: parseInt(this.productForm.quantity),
              materialIds: this.productForm.material,
              gallery: this.productForm.images,
              amount: this.amount,
              weight: this.productForm.weight,
            }, 
            {
              headers: {
                Authorization: 'Bearer ' + this.token,
              }
            })
            console.log(response)
            if(response.data.status == "200") {
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
    
    async previewFiles(event) { 
      this.upload = false
      const data = new FormData()
      let imgValid = true
      try {
        for( let i = 0; i < event.target.files.length; i++ ){
          if(i < (5 - this.productForm.images.length)) {
            data.append('image', event.target.files[i]);
          }
          else {
            imgValid = false
          }
        }
        const response = await axios.post(`http://localhost:5000/api/v1/gallery`, data, 
        {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          const listImg = response.data.data
          listImg.forEach(img => {
            let obj = {}
            obj["kind"] = "image"
            obj["src"] = img
            obj["status"] = true
            obj["id"] = null
            this.productForm.images.push(obj)
            this.showImages.push(img)
            
          });
          this.upload = true
          console.log(this.productForm.images);
          console.log(this.showImages);
          if(!imgValid) {
            throw {
                message: "The number of images is less than 5"
              }
          }
        }
        else {
          this.upload = true
          this.$notification["error"]({
            message: 'Upload Image Error',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'Upload Image Error',
          description:
            e.message
        });
       }
    },
  
    removeImage(index) {
      if(this.productForm.images[index].id != null) {
        this.productForm.images[index].status = false
      }
      else {
        this.productForm.images.splice(index, 1)
      }
      console.log( this.productForm.images);
      this.showImages.splice(index, 1)
    },

    async getListCate() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/categories`)
        console.log(response);
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

    async getProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/shop/products/${this.$route.params.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        if(response.data.status == "200") {
          const data = response.data.data
          this.productForm.name = data.name
          console.log(this.getIdParentCate(data.categoryId));
          this.productForm.productType = this.getIdParentCate(data.categoryId)
          this.productForm.description = data.description
          this.productForm.material = this.getID(data.materials)
          this.productForm.quantity = data.restAmount
          this.productForm.price = data.price
          this.productForm.images = data.gallery
          this.getSource(data.gallery)
          this.amount = data.amount
          this.productForm.weight = data.weight
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
        if(obj.children) {
          rObj["children"] = this.mappingData(obj.children)
        }
        return rObj;
      });
      return reformattedArray
    },

    getID(data) {
      const arr = []
      data.forEach(item => {
        let id = String(item.id)
        arr.push(id)
      })
      return arr
    },

    getSource(data) {
      data.forEach(img => {
        this.showImages.push(img.src)
      })
    },
    getIdParentCate(id) {
      const arr = []
      this.listCate.forEach(item => {
        if(item.children) {
          item.children.forEach(i => {
            if( i.value == id) {
              arr.push(item.value)
              arr.push(id)
            }
          })
        }
      })
      return arr
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>