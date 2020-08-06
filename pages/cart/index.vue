<template>
  <div class="cover-cart">
    <div class="container my-5">

      <a-page-header
        class="header white-theme"
        title="CART"
      />

      <a-table :columns="columns" :data-source="products" :row-selection="rowSelection" class="border-cover white-theme">
        <span slot="nameAndThumbnail"  slot-scope="text, record">
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
            v-if="products.length"
            title="Sure to delete?"
             @confirm="deleteItem(record.key)"
          >
            <a href="javascript:;">Xóa</a>
          </a-popconfirm>
        </span>
      </a-table>
      <!-- Table -->
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
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
export default {
  layout: 'cart',
  data() {
    return {
      columns,
      rowSelection,
      products: [],
    }
  },
  mounted() {
    this.fetchProductsInStorage();
  },
  methods: {
    amountChange(record) {
      this.$store.dispatch('cart/changeAmount', { record })
    },
    deleteItem(key) {
      const products = [...this.products]
      this.products = products.filter(item => item.key !== key)
      this.$store.dispatch('cart/removeCart', { key })
      // window.localStorage.setItem("products", this.dataSource)
    },
    fetchProductsInStorage() {
      if(Cookie.get('user')) {
        if(localStorage.getItem('product')) {
          const products = JSON.parse(localStorage.getItem('product'))
          this.products = products.map(({count, product}) => 
            ({
              key: product.id,
              nameAndThumbnail: {
                name: product.name,
                thumbnail: product.thumbnail,
              },
              price: product.price,
              amount: count,
              restAmount: product.restAmount,
            })
          )
        } 
      }
      else {
        if(localStorage.getItem('productNoLogin')) {
          const products = JSON.parse(localStorage.getItem('productNoLogin'))
          this.products = products.map(({count, product}) => 
            ({
            key: product.id,
            nameAndThumbnail: {
              name: product.name,
              thumbnail: product.thumbnail,
            },
            price: product.price,
            amount: count,
            total: count * product.price,
            restAmount: product.restAmount,
            })
          )
        } 
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>