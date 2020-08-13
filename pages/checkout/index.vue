<template>
  <div class="cover-cart">
    <div class="container my-5">
      <div class="white-theme p-4">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="al-color-orange "><a-icon class="mr-2" type="environment" />Địa Chỉ Nhận Hàng</h3>
          <div>
            <a-button @click="showDrawer"> <a-icon type="plus" /> Thêm địa chỉ mới </a-button>

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
                <a-form-model-item prop="nameUser">
                  <a-input placeholder="Họ và Tên" v-model="form.nameUser"/>
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
            <!-- Tạo địa chỉ mới -->
          </div>
        </div>
        <div class="mt-2">
          <a-radio-group class="d-flex flex-column" v-model="addrChoice">
            <a-radio v-for="(addr, index) in listAddr" :key="index" class="mb-2" :value="addr.id">
              <b class="mr-3">{{ addr.name }}   (+84){{ addr.phone }}</b> {{addr.location}}, {{ addr.district.name}}, {{ addr.district.city.name }}
            </a-radio>
          </a-radio-group>
        </div>
      </div>

      <div class="mt-3" v-for="(shop, index) in shops" :key="index">
        <a-table :pagination="false" :columns="columns" :data-source="shop.products" class="border-cover white-theme">
          <template slot="title">
            <nuxt-link class="pl-4 al-color-orange" :to="`/shop/${shop.slug}`"> <a-icon type="shop" class="pr-3"/>{{ shop.shopName }} </nuxt-link>
          </template>

          <span slot="nameAndThumbnail" class="d-flex align-items-center"  slot-scope="text, record">
            <span class="cart-name">{{ record.nameAndThumbnail.name }}</span>
            <img v-bind:src="record.nameAndThumbnail.thumbnail" class="cart-thumbnail">
          </span>

          <span slot="price" slot-scope="text, record">
            <span class="font--regular-2">₫ {{ record.price}}</span>
          </span>

          <span slot="total" slot-scope="text, record">
            <span class="font--regular-2">₫ {{ record.price * record.amount }}</span>
          </span>
        </a-table>
        <div class="p-4 al-bg-total al-border-dotted">
          <div class="row d-flex align-items-center">
            <span class="col-2">Đơn vị vận chuyển:</span>
            <a-select v-model="shop.ship"  class="col-8" @change="handleChange()">
              <a-select-option v-for="(item, index) in shop.transports" :key="index" :value="`${item.id}`">
                {{ item.brand}} (₫ {{ parseInt(item.fee * shop.totalWeight) }})
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="p-4 al-bg-total d-flex justify-content-end align-items-center">
          <p class="mb-0 mr-3">Tổng tiền hàng: </p>
           <p class="mb-0 pr-4 font--25 font--regular-2 al-color-orange">{{ shop.totalCost }}</p>
        </div>
      </div>
      <!-- Table -->

      <div class="white-theme p-4 mt-3 d-flex flex-column">
        <div class="row d-flex justify-content-end align-items-center">
          <p class="mb-0 mr-3 col-2">Tổng tiền hàng: </p>
          <div class="d-flex justify-content-end col-2">
            <p class="mb-0"> ₫ {{ getTotal }}</p>
          </div>
        </div>

        <div class="row d-flex justify-content-end align-items-center mt-2">
          <p class="mb-0 mr-3 col-2">Phí vận chuyển: </p>
          <div class="d-flex justify-content-end col-2">
            <p class="mb-0"> ₫ {{ getTotalShip }}</p>
          </div>
        </div>

        <div class="row d-flex justify-content-end align-items-center my-2">
          <p class="mb-0 mr-3 col-2">Tổng Thanh Toán: </p>
          <div class="d-flex justify-content-end col-2">
            <p class="mb-0 font--25 font--regular-2 al-color-orange"> ₫ {{ getTotalBill }}</p>
          </div>
        </div>
      </div>

      
      <div class="white-theme al-border-dotted-top d-flex p-4 justify-content-end">
        <a-button size="large" class="al-button-buy px-5" @click="buyProduct">
          Đặt Hàng
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import empty from 'ant-design-vue/lib/empty'
const Cookie = process.client ? require('js-cookie') : undefined

const columns = [
  {
    title: 'Sản phẩm',
    dataIndex: 'nameAndThumbnail',
    key: 'nameAndThumbnail',
    scopedSlots: { customRender: 'nameAndThumbnail' },
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
    key: 'amount',
    scopedSlots: { customRender: 'amount' }
  },
  {
    title: 'Thành tiền',
    key: 'total',
    scopedSlots: { customRender: 'total' },
  },
];

export default {
  middleware: ['getState', 'authentication'],
  layout: 'cart',
  data() {
    let validatePhone = (rule, value, callback) => {
      if (/(0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) {
        callback();
      } else {
        callback(new Error('Số điện thoại không hợp lệ'));
      }
    };
    return {
      columns,
      isLoading: false,
      visible: false,
      listCity: [],
      listDistrict: [],
      listAddr: [],
      token: Cookie.get('token'),
      addrChoice: '',
      shops: [],
      listTransport: [],
      form: {
        nameUser: '',
        phone: '', 
        city: undefined,
        district: undefined,
        location: '',
      },
      rules: {
        nameUser: [{ required: true, message: 'Tên không được bỏ trống', trigger: 'change'}],
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
    this.fetchProductsInStorage()
    //this.getListTransport()
    this.getListAddr()
  },

  computed: {
    getTotal() {
      let total = 0
      this.shops.forEach(element => {
        total += element.totalTemp
      });
      return total
    },

    getTotalShip() {
      let total = 0
      this.shops.forEach(element => {
        if(element.totalShip) {
          total += element.totalShip
        }
      });
      return total
    },

    getTotalBill() {
      let total = 0
      this.shops.forEach(element => {
        total += element.totalCost
      });
      return total
    }
  },

  methods: {
    // Chọn đơn vị vận chuyển OK
    async getListTransport(id) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/transports?key=shop&value=${id}`)
        if(response.data.status == "200") {
          return response.data.data
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

    handleChange(value) {
      this.shops = this.shops.filter(e => {
        if(e.ship) {
          e.transports.forEach(t => {
            if(t.id == e.ship) {
              let temp = parseInt(e.totalWeight * t.fee)
              e["totalShip"] = temp
              e.totalCost = e.totalTemp
              e.totalCost += temp

            }
          })
        }
        return e
      })

      console.log(this.shops);
    },

    // Lấy danh sách địa chỉ OK
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
    
    // Form tạo địa chỉ OK
    showDrawer() {
      this.visible = true;
      this.getListAddr()
      this.getListCity()
    },

    onClose() {
      this.visible = false;
    },

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

    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.isLoading = true
          try {
            const response = await axios.post('http://localhost:5000/api/v1/users/addresss', {
              name: this.form.nameUser,
              phone: this. form.phone,
              districtId: this.form.district,
              location: this.form.location
            }, {
              headers: {
                Authorization: 'Bearer ' + this.token,
              }
            })
            
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
          return false;
        }
      });
    },

    // Lấy list sản phẩm OK
    fetchProductsInStorage() {
      if(Cookie.get('user')) {
        let user = JSON.parse(Cookie.get('user'))
        let id = String(user.id)
        if(localStorage.getItem(id)) {
          this.shops = JSON.parse(localStorage.getItem(id))
          this.shops = this.shops.filter(element => {
            let products = element.products
            element.products = products.map(({count, product}) => 
              ({
                key: product.id,
                nameAndThumbnail: {
                  name: product.name,
                  thumbnail: product.thumbnail,
                },
                price: product.reduce,
                amount: count,
                restAmount: product.restAmount,
                weight: product.weight,
              })
            )
            element["totalWeight"] = element.products.reduce((a, b) => {
              return a + (b.weight * b.amount)
            }, 0)

            element["totalCost"] = element.products.reduce((a, b) => {
              return a + (b.price * b.amount)
            }, 0)
            element["totalTemp"] = element.products.reduce((a, b) => {
              return a + (b.price * b.amount)
            }, 0)
            return element
          });
          this.shops.forEach(async s => {
            s["transports"] = await this.getListTransport(s.shopID)
          })
          console.log(this.shops)
        }
      }
    },

    // Dặt Hàng
    async buyProduct() {
      try {
        if(this.addrChoice == "") {
          throw {
            message: "Bạn chưa chọn địa chỉ nhận hàng"
          }
        }
        
        this.shops.forEach(e => {
          if(!e.ship) {
            throw {
              message: "Bạn chưa chọn hình thức vận chuyển cho shop " + e.shopName
            }
          }
        })
        let shopSubmit = this.shops.map(shop => {
          let obj = {}
          obj["shopId"] = shop.shopID
          obj["addressId"] = this.addrChoice
          obj["transportId"] = shop.ship
          obj["totalShip"] = shop.totalShip
          obj["totalBillAndShip"] = shop.totalCost
          obj["totalBill"] = shop.totalTemp
          let products = shop.products
          obj["products"] = products.map(p => {
            let rObj = {}
            rObj["id"] = p.key
            rObj["amount"] = p.amount
            rObj["weight"] = p.weight
            rObj["cost"] = p.price
            rObj["name"] = p.nameAndThumbnail.name
            return rObj
          })
          return obj
        })
        console.log(shopSubmit)
        const response = await axios.post("http://localhost:5000/api/v1/users/orders", shopSubmit, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response);
        let user = JSON.parse(Cookie.get('user'));
        let id = String(user.id)
        if(response.data.status == "200") {
          let orderFailed = response.data.orderFailed
          if(orderFailed.length != 0) {
            orderFailed.forEach(e => {
              let products = e.products
              products.forEach(p => {
                this.$notification["error"]({
                  message: 'SOLD OUT',
                  description:
                    `"Sản phẩm" ${p.name} chỉ còn ${p.restAmount} sản phẩm`
                });
                let record = p.map(re => {
                  let obj = {}
                  obj["key"] = re.id
                  obj["amount"] = re.restAmount
                  return obj
                })
                this.$store.dispatch('cart/changeAmount', { record, state: 'product', userID: id, changeRestAmount: 'yes' })
              })
            })
            this.$router.push("/cart")
          }
          else{
            this.$store.dispatch('cart/removeAll')
            localStorage.removeItem(id)
            this.$router.push("/user/purchase/wait")
          }
        }
        else {
          this.$notification["error"]({
            message: 'BUY FAIL',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'BUY FAIL',
          description:
            e.message
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>