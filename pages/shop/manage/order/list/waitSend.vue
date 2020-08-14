<template>
  <a-layout style="padding: 12px 12px 12px" class="product">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <a-tabs default-active-key="3" @change="callback">
        <a-tab-pane key="1" tab="Tất cả">
        </a-tab-pane>
        <a-tab-pane key="2" tab="Chờ xác nhận">
        </a-tab-pane>
        <a-tab-pane key="3" tab="Chờ lấy hàng">
        </a-tab-pane>
        <a-tab-pane key="4" tab="Đang giao">
        </a-tab-pane>
        <a-tab-pane key="5" tab="Đã giao">
        </a-tab-pane>
        <a-tab-pane key="6" tab="Đã hủy">
        </a-tab-pane>
      </a-tabs>

      <div class="d-flex align-items-center ">
        <p class="mb-0 font--regular-2 mr-2">Ngày Đặt Hàng</p>
        <a-range-picker 
        format="YYYY/MM/DD" 
        @change="onChange" 
        :placeholder="['Ngày Bắt Đầu', 'Ngày Kết Thúc']"
      />
      </div>

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
            v-if="record.status == 'pending confirm'"
            title="Are you sure cancel this order?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a-button type="danger">
              Hủy
            </a-button>
          </a-popconfirm>

          <a-button v-if="record.status != 'cancel'" @click="Accept(record)" class="al-btn-success">
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
  </a-layout>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'layoutSidebar',
  middleware: ['authentication'],
  data() {
    return {
      pagination: {},
      loading: false,
      token: Cookie.get('token'),
      columns: [
          {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            scopedSlots: { customRender: 'products' },
          },
          {
            title: 'Tổng đơn hàng',
            dataIndex: 'totalBillAndShip',
            key: 'totalBillAndShip',
            scopedSlots: { customRender: 'totalBillAndShip' },
          },
          {
            title: 'Khách hàng',
            dataIndex: 'user',
            key: 'user',
            scopedSlots: { customRender: 'user' },
          },

          {
            title: 'Trạng thái',
            dataIndex: 'nameStatus',
            key: 'nameStatus',
          },

          {
            title: 'Thao tác',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
      ],
      data: [],
      status: ["cancel", "pending_confirm", "pending_received_goods", "delivering", "delivered"]
    }
  }, 

  mounted() {
    this.getAllOrder()
  },

  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.loading = true

      let pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      //this.getAllproduct(pagination.current)
      this.loading = false
    },

    callback(key) {
      if(key == 1) {
        this.$router.push('/shop/manage/order/list/all')
      }
      if(key == 2) {
        this.$router.push('/shop/manage/order/list/wait')
      }
      if(key == 3) {
        this.$router.push('/shop/manage/order/list/waitSend')
      }
      if(key == 4) {
        this.$router.push('/shop/manage/order/list/shipping')
      }
      if(key == 5) {
        this.$router.push('/shop/manage/order/list/complete')
      }
      if(key == 6) {
        this.$router.push('/shop/manage/order/list/cancel')
      }
    },

    onChange(date, dateString) {
      console.log(date, dateString);
    },

    async getAllOrder() {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/shop/orders", {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          let data = response.data.data
          this.data = data.map(e => {
            if(e.status == "pending confirm") {
              e.nameStatus = "Chờ xác nhận"
            }
            if(e.status = "cancel") {
              e.nameStatus = "Đã hủy"
            }
            return e
          })
          console.log(this.data)
        }
        else {
          this.$notification["error"]({
            message: 'GET ORDER ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET ORDER ERROR',
          description:
            e.message
        });
      }
    },

    async confirm(id) {
      try {
        let status = "cancel"
        const response = await axios.patch(`http://localhost:5000/api/v1/user/orders/${id}?status=${status}`, { status: status}, {
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.getAllOrder()
          this.$notification['success']({
            message: 'CANCEL PRODUCT SUCCESS',
            description:
              'Success!',
          });
        }
        else {
          this.$notification['error']({
            message: 'CANCEL ORDER FAIL',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification['error']({
          message: 'CANCEL ORDER FAIL',
          description:
            e.message
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>