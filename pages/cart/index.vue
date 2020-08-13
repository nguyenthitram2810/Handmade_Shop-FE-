<template>
  <div class="cover-cart">
    <div class="container my-5">

      <a-page-header
        class="header white-theme"
        title="CART"
      />

      <div v-for="(shop, index) in shops" :key="index">
        <a-table :pagination="false" :columns="columns" :data-source="shop.products" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" class="border-cover white-theme mb-4">
          <template slot="title">
            <nuxt-link class="pl-4 al-color-orange" :to="`/shop/${shop.slug}`"> <a-icon type="shop" class="pr-3"/>{{ shop.shopName }} </nuxt-link>
          </template>
          <span slot="nameAndThumbnail" class="d-flex align-items-center"  slot-scope="text, record">
            <span class="cart-name">{{ record.nameAndThumbnail.name }}</span>
            <img v-bind:src="record.nameAndThumbnail.thumbnail" class="cart-thumbnail">
          </span>
          <span slot="total" slot-scope="text, record">
            <span>{{ record.price * record.amount }}</span>
          </span>
          <span slot="amount" slot-scope="text, record">
            <a-input-number size="large" :min="1" :max="record.restAmount" v-model="record.amount" @change="amountChange(record)" />
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popconfirm
              title="Sure to delete?"
               @confirm="deleteItem(record.key, index)"
            >
              <a href="javascript:;">Xóa</a>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
      <!-- Table -->
      <a-affix :offset-bottom="0" >
        <div class="header white-theme al-fixed-cart p-4 d-flex justify-content-between align-items-center">
          <a-checkbox :checked="isCheckAll" @change="checkAll">
            Tất cả
          </a-checkbox>
          <div class="d-flex align-items-center">
            <p class="mb-0 mr-3" style="color: rgba(0, 0, 0, 0.65);">Tổng tiền hàng: </p>
            <p class="mb-0 pr-4 font--35 font--regular-2">{{ getTotal }}</p>
            <a-button :disabled="selectedRowKeys.length <= 0" size="large" class="al-button-buy px-5" @click="onSubmit">
              Mua ngay
            </a-button>
          </div>
        </div>
      </a-affix>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import url("./style.scss");
</style>

<script>
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
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
    key: 'amount',
    scopedSlots: { customRender: 'amount' }
  },
  {
    title: 'Số tiền',
    key: 'total',
    scopedSlots: { customRender: 'total' },
  },
  {
    title: 'Thao tác',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  middleware: 'getState',
  layout: 'cart',
  data() {
    return {
      columns,
      shops: [],
      selectedRowKeys: [],
      isCheckAll: true,
      productID: [],
      selectedRows: [],
    }
  },
  mounted() {
    this.fetchProductsInStorage();
  },
  computed: {
    getTotal() {
      let total = 0
      let obj = {}
      this.shops.forEach(element => {
        element.products.forEach(p => {
          if(this.selectedRowKeys.includes(p.key)) {
            total += p.price * p.amount
          }
        })
      });
      return total
    }
  },
  methods: {
    amountChange(record) {
      if(Cookie.get('user')) {
        let user = JSON.parse(Cookie.get('user'))
        let id = String(user.id)
        this.$store.dispatch('cart/changeAmount', { record, state: 'product', userID: id , changeRestAmount: 'no'})
      }
      else {
        this.$store.dispatch('cart/changeAmount', { record, state: 'productNoLogin', userID: 'noLogin', changeRestAmount: 'no' })
      }
    },

    deleteItem(key, index) {
      let products = this.shops[index].products
      this.shops[index].products= products.filter(item => item.key !== key)
      this.shops = this.shops.filter(item => item.products.length != 0)
      if(Cookie.get('user')) {
        let user = JSON.parse(Cookie.get('user'))
        let id = String(user.id)
        this.$store.dispatch('cart/removeCart', { key, state: 'product', userID: id })
      }
      else {
        this.$store.dispatch('cart/removeCart', { key, state: 'productNoLogin', userID: 'noLogin' })
      }
    },

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
              })
            )
            return element
          });
          this.shops.forEach(el => {
            el.products.forEach(p => {
              this.productID.push(p.key)
            })
          })
          this.selectedRowKeys = this.productID
        } 
      }
      else {
        if(localStorage.getItem('noLogin')) {
          this.shops = JSON.parse(localStorage.getItem('noLogin'))
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
              })
            )
            return element
          });
          this.shops.forEach(el => {
            el.products.forEach(p => {
              this.productID.push(p.key)
            })
          })
          this.selectedRowKeys = this.productID
        } 
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      if(selectedRowKeys.length < this.productID.length) {
        this.isCheckAll = false
      }
      else {
        this.isCheckAll = true
      }
      this.selectedRowKeys = selectedRowKeys
    },

    checkAll() {
      this.isCheckAll = !this.isCheckAll
      if(this.isCheckAll == true) {
        this.selectedRowKeys = this.productID
      }
      else {
        this.selectedRowKeys = []
      }
    },
    
    onSubmit() {
      try {
        if(Cookie.get('user')) {
          this.$root.$router.push("/checkout")
        }
        else {
          this.$root.$router.push("/login")
          this.$notification["error"]({
            message: 'BUY PRODUCTS ERROR',
            description:
              "Bạn phải đăng nhập để tiến hành thah toán"
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'BUY PRODUCTS ERROR',
          description:
            e.message
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>