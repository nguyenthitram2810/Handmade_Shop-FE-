<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>THÊM SẢN PHẨM MỚI</h3>
    </div>

    <div class="container">   
      <a-form-model ref="productForm" :model="productForm" :rules="rules" v-bind="layout">
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
          <a-input-number :min="1" addon-before="VNĐ" v-model="productForm.price" class="al-w-100 "/>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Giảm giá" prop="percent">
          <a-input-number :min="1" :max="100" addon-before="%" v-model="productForm.percent" class="al-w-100 " />
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Trọng lượng" prop="weight">
          <a-input-number :min="0" addon-before="gam" v-model="productForm.weight" class="al-w-100 "/>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Số lượng" prop="quantity">
          <a-input-number :min="0" v-model="productForm.quantity" class="al-w-100 "/>
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

        <a-form-model-item  :wrapper-col="{ span: 14, offset: 4 }">
          <a-button :loading="isLoading" :disabled="isDisabled" type="primary" @click="submitForm('productForm')">
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import upload from 'ant-design-vue/lib/upload';
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: 'authentication',
  data() {
    return {
      isLoading: false,
      isDisabled: false,
      upload: true,
      listCate: [],
      listMaterial: [],
      showImages:[],
      productForm: {
        name: '',
        productType: '',
        description: '',
        material: [],
        price: '',
        quantity: '',
        images: [],
        weight: '',
        percent: '',

      },
      rules: {
        name: [
          { required: true, message: 'Nhập tên sản phẩm', trigger: 'change' },
          {max: 40, message: 'Độ dài tên sản phẩm nhỏ hơn 40', trigger: 'change'}       
        ],
        productType: [{ required: true, message: 'Chọn loại sản phẩm', trigger: 'change' }],
        description: [{ required: true, message: 'Điền mô tả sản phẩm', trigger: 'change' }],
        material: [{ required: true, message: 'Chọn vật liệu', trigger: 'change' }],
        price: [
          { required: true, message: 'Điền giá sản phẩm', trigger: 'change' },
        ],
        quantity: [
          { required: true, message: 'Điền số lượng sản phẩm', trigger: 'change' },
        ],
        weight: [
          { required: true, message: 'Điền trọng lượng sản phẩm', trigger:'change'},
        ],
        percent: [
          { required: true, message: 'Điền giảm giá cho sản phẩm', trigger:'change'},
        ]
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
  },
   methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            this.isLoading = true
            if(this.productForm.images.length == 0) {
              throw {
                message: "Bạn chưa chọn hình ảnh sản phẩm!"
              }
            }
            const token = Cookie.get("token")
            const user = JSON.parse(Cookie.get("user"))
            console.log(user);
            console.log(user.shop);
            const response = await axios.post(`http://whispering-reef-26272.herokuapp.com/api/v1/users/shop/products`, 
            {
              shopId: parseInt(user.shop.id),
              name: this.productForm.name,
              categoryId: this.productForm.productType[this.productForm.productType.length - 1],
              description: this.productForm.description,
              price: this.productForm.price,
              restAmount: parseInt(this.productForm.quantity),
              materialIds: this.productForm.material,
              gallery: this.productForm.images,
              weight: this.productForm.weight,
              percent: this.productForm.percent,
              reduce: this.productForm.price - parseInt(this.productForm.price/100 * this.productForm.percent)
            }, 
            {
              headers: {
                Authorization: 'Bearer ' + token,
              }
            })
            console.log(response)
            if(response.data.status == "200") {
              this.$router.push("/shop/manage/product/list")
            }
            else {
              this.isLoading = false
              this.$notification["error"]({
                message: 'CREATE PRODUCT ERROR',
                description:
                  response.data.message
              });
            }
          }
          catch(e) {
            this.isLoading = false
            this.$notification["error"]({
              message: 'CREATE PRODUCT ERROR',
              description:
                e.message
            });
          }
        } else {
          return false;
        }
      });
    },
    
    async previewFiles(event) { 
      this.isDisabled = true
      this.upload = false
      const data = new FormData()
      try {
        if(this.productForm.images.length + event.target.files.length > 5) {
          throw {
                message: "The number of images is less than 6"
              }
        }
        for( let i = 0; i < event.target.files.length; i++ ){
          data.append('image', event.target.files[i]);
        }
        const token = Cookie.get("token")
        const response = await axios.post(`http://whispering-reef-26272.herokuapp.com/api/v1/gallery`, data, 
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        if(response.data.status == "200") {
          const listImg = response.data.data
          listImg.forEach(img => {
            let obj = {}
            obj["kind"] = "image"
            obj["src"] = img
            this.productForm.images.push(obj)
            this.showImages.push(img)
          });
          this.isDisabled = false
          this.upload = true
        }
        else {
          this.$notification["error"]({
            message: 'Upload Image Error',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.isDisabled = false
        this.upload = true
        this.$notification["error"]({
          message: 'Upload Image Error',
          description:
            e.message
        });
       }
    },
  
    removeImage(index) {
      this.productForm.images.splice(index, 1)
      this.showImages.splice(index, 1)
    },

    async getListCate() {
      try {
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/categories`)
        if(response.data.status == "200") {
          this.listCate = this.mappingData(response.data.data)
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST CATEGORIES ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST CATEGORIES ERROR',
          description:
            e.message
        });
      }
    },

    async getListMaterial() {
      try {
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/materials`)
        if(response.data.status == "200") {
        this.listMaterial = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST MATERIALS ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET LIST MATERIALS ERROR',
          description:
            e.message
        });
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
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>