<template>
  <a-layout style="padding: 12px 12px 12px" class="product">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <a-tabs default-active-key="1" @change="callback">
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

      <!-- <a-table class="pt-4" :columns="columns" :data-source="data" @change="handleTableChange" :loading="loading" :pagination="pagination" bordered>
        <span slot="soldAmount" slot-scope="text, record">
          <p>{{ record.restAmount -  record.amount }}</p>
        </span>
        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a-button type="danger">
              Delete
            </a-button>
          </a-popconfirm>
          <nuxt-link :to="`/shop/manage/product/edit/${record.id}`"> 
            <a-button class="al-btn-success">
              Edit
            </a-button>
          </nuxt-link>
          <nuxt-link :to="`/shop/product/detail/${record.slug}`"> 
            <a-button type="primary">
              View Detail
            </a-button>
          </nuxt-link>
        </span>
      </a-table> -->
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
      token: Cookie.get('token'),
    }
  }, 
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>