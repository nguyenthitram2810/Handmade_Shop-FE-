<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4" :columns="columns" :data-source="data"  @change="handleTableChange" :loading="loading" :pagination="pagination" bordered>
        <span slot="products" slot-scope="text, record">
          <div v-for="(item, index) in record.products" :key="index" class="d-flex mt-2">
            <img :src="item.product.thumbnail" alt="" class="cart-thumbnail mr-3">
            <div class="d-flex flex-column">
              <p class="cart-name font--regular-2"> {{item.name}}</p>
              <b> x {{ item.amount}}</b>
            </div>
          </div>
        </span>

        <span slot="totalBillAndShip" slot-scope="text, record">
          <p>₫ {{ record.totalBillAndShip }}</p>
        </span>

        <span slot="user" slot-scope="text, record">
          <b>{{ record.user.name }}</b>
        </span>

        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.status == 'pending_confirm'"
            title="Are you sure cancel this order?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a-button type="danger">
              Hủy
            </a-button>
          </a-popconfirm>

          <a-button v-if="record.status != 'cancel' && record.status != 'delivered' && record.status != 'delivering'" @click="acceptOrder(record)" class="al-btn-success">
              Xác nhận
          </a-button>

          <nuxt-link :to="`/shop/product/detail/${record.slug}`"> 
            <a-button type="primary">
              View Detail
            </a-button>
          </nuxt-link>
        </span>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'adminAuthen',
  data() {
    return {
      collapsed: false,
      columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            scopedSlots: { customRender: 'avatar' },
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            scopedSlots: { customRender: 'avatar' },
          },
          {
            title: 'Verify',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: 'Shop Active',
            dataIndex: 'shopActive',
            key: 'shopActive',
            scopedSlots: { customRender: 'shopActive' },
          },
          {
            title: 'Thao tác',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
      ],
      data: [],
      loading: false,
      pagination: {
        curent: 1,
        total: 0,
      }
    }
  }, 
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      this.loading = true

      let pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      let params = this.$route.query
      params.page = this.pagination.current

      this.$router.push({ query: params})
      this.getAllOrder(params)
      this.loading = false
    },
  }
}
</script>

<style lang="scss" scoped>

</style>