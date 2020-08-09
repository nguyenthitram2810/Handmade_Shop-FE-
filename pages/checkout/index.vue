<template>
  <div class="cover-cart">
    <div class="container my-5">
      <div class="white-theme p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="al-color-orange "><a-icon class="mr-2" type="environment" />Địa Chỉ Nhận Hàng</h3>
          <div>
            <a-button>Thêm địa chỉ mới</a-button>
          </div>
        </div>
        <div v-for="(addr, index) in listAddr" :key="index" >
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import empty from 'ant-design-vue/lib/empty'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'getState',
  layout: 'cart',
  data() {
    return {
      listAddr: [],
      token: Cookie.get('token')
    }
  },
  mounted() {
    this.getListAddr()
  },
  methods: {
    async getListAddr() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/addresss", {
          headers: {
                Authorization: 'Bearer ' + this.token,
          }
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>