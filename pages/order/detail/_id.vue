<template>
  <div class="cover-cart">
    <div class="container my-5">
      <a-steps v-if="bill.status != cancel" :current="statusOrder" size="small" class="mb-5">
        <a-step title="Chờ xác nhận" />
        <a-step title="Chờ lấy hàng" />
        <a-step title="Đang giao" />
        <a-step title="Đã giao" />
      </a-steps>

      <div v-if="bill.status == 'cancel'" class="al-bg-danger p-4 mb-5">
        <p class="mb-0 m-auto al-text-center" style="color: white;"> Đơn Hàng Đã Hủy</p>
      </div>
      <div class="white-theme p-4">
        <h3 class="al-color-orange ">Thông Tin Địa chỉ</h3>
        <p class="mt-2"><b>Người nhận:</b> {{ address.name}}</p>
        <p class="mt-2"><b>Số điện thoại:</b> (+84) {{ address.phone}}</p>
        <p><b>Địa chỉ nhận hàng:</b> {{ address.location}}, {{ district.name }}, {{ city.name}}</p>
      </div>

      <div class="white-theme p-4 mt-3">
        <h3 class="al-color-orange ">Thông Tin Đơn Hàng</h3>
        <div class="mt-3 p-4 white-theme" >
          <div>
            <nuxt-link class=" al-color-orange" :to="`/shop/${shop.slug}`"> <a-icon type="shop" class="pr-3"/>{{ shop.name }} </nuxt-link>
          </div>
          <div v-for="(product, index) in products" :key="index" class="al-border-top mt-2 py-3 mx-1 row d-flex align-items-center">
            <div class="col-6 d-flex">
              <img :src="product.product.thumbnail" alt="" class="cart-thumbnail mr-3" >
              <div class="d-flex flex-column">
                <p class="cart-name font--regular-2"> {{product.name}}</p>
                <p> x {{ product.amount}}</p>
              </div>
            </div>
            <div class="col-6 d-flex justify-content-end al-color-orange">
              ₫ {{ product.cost}}
            </div>
          </div>
        </div>
      </div>
      <div class="al-border-dotted-top p-4 al-bg-total">
        <div class="mt-3 d-flex flex-column">
          <div class="row d-flex justify-content-end align-items-center">
            <p class="mb-0 mr-3 col-2">Tổng tiền hàng: </p>
            <div class="d-flex justify-content-end col-2">
              <p class="mb-0"> ₫ {{ bill.totalBill }}</p>
            </div>
          </div>

          <div class="row d-flex justify-content-end align-items-center mt-2">
            <p class="mb-0 mr-3 col-2">Phí vận chuyển: </p>
            <div class="d-flex justify-content-end col-2">
              <p class="mb-0"> ₫ {{ bill.totalShip }}</p>
            </div>
          </div>

          <div class="row d-flex justify-content-end align-items-center my-2">
            <p class="mb-0 mr-3 col-2">Tổng Thanh Toán: </p>
            <div class="d-flex justify-content-end col-2">
              <p class="mb-0 font--25 font--regular-2 al-color-orange"> ₫ {{ bill.totalBillAndShip }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: ['authentication','getState'],
  data() {
    return {
      token: Cookie.get('token'),
      bill: {},
      shop : {},
      products: [],
      address: {},
      district: {},
      city: {},
      status: ["pending_confirm", "pending_received_goods", "delivering", "delivered"],
      statusOrder: ''
    }
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    async getOrder() {
      try {
        let key = 'client'
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/users/orders/${this.$route.params.id}?key=${key}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          this.shop = response.data.data.shop
          this.products = response.data.data.products.rows
          this.address = response.data.data.address
          this.district = response.data.data.address.district
          this.city = this.district.city
          this.bill = response.data.data
          for( let i = 0; i < this.status.length; i++) {
            if(this.status[i] == this.bill.status) {
              this.statusOrder = i
            }
          }
        }
        else {
          this.$notification['error']({
            message: 'GET ORDER DETAIL FAIL',
            description:
              response.data.message
          });
        }
      } 
      catch (e) {
        this.$notification['error']({
            message: 'GET ORDER DETAIL FAIL',
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