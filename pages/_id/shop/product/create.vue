<template>
  <div class="container">
    <div class="al-text-center mt-5">
      <h3>THÊM SẢN PHẨM MỚI</h3>
    </div>

    <div class="container">   
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item :wrapper-col="{ ul: 14, offset: 4 }">
          <ul style="color:red; list-style-type: none;" v-for="item in errors" v-bind:key="item">
            <li>{{item.message}}</li>
          </ul>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Tên sản phẩm" prop="nameProduct">
          <a-input v-model="ruleForm.nameProduct" type="text" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Loại sản phẩm" prop="productType">
            <a-cascader v-model="ruleForm.productType" :options="options" change-on-select @change="onChange" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Mô tả sản phẩm" prop="description">
          <a-input v-model="ruleForm.description" type="textarea" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Vật liệu" prop="material">
          <a-select v-model="ruleForm.material">
            <a-select-option value="bo">
              Bò
            </a-select-option>
            <a-select-option value="contton">
              Cotton
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Giá cả" prop="price">
          <a-input addon-before="VNĐ" v-model="ruleForm.price" type="number" />
        </a-form-model-item>

        <a-form-model-item  has-feedback label="Số lượng" prop="quantity">
          <a-input v-model="ruleForm.quantity" type="number" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="Ảnh sản phẩm" prop="image">
          <div class="clearfix">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>

            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>

        <a-form-model-item has-feedback label="Đơn vị vận chuyển" prop="ship">
          <a-select v-model="ruleForm.ship">
            <a-select-option value="ghn">
              Giao hàng nhanh
            </a-select-option>
            <a-select-option value="ghtk">
              Giao hàng tiết kiệm
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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      errors:[],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
      ruleForm: {
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
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  },

  mounted() {
    
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleCancel() {
      this.previewVisible = false;
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    
  },
}
</script>

<style lang="scss" scoped>
  .ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>