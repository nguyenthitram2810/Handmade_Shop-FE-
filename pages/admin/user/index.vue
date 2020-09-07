<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4" :columns="columns" :data-source="data"  @change="handleTableChange" :loading="loading" :pagination="pagination" bordered>
        <span slot="status" slot-scope="text, record">
          <a-switch v-if="admin.id != record.id" v-model="record.status" @change="onChange(record)"/>
          <span v-else>{{ String(record.status)}}</span>
        </span>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script>
import axios from "axios"
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'admin',
  middleware: 'adminAuthen',
  data() {
    return {
      upload: true,
      isDisabled: false,
      isLoading: false,
      token: Cookie.get('token'),
      admin: JSON.parse(Cookie.get('user')),
      collapsed: false,
      columns: [
          {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            scopedSlots: { customRender: 'avatar' },
          },
          {
            title: 'Email',
            dataIndex: 'username',
            key: 'email',
          },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
          },
      ],
      data: [],
      loading: false,
      pagination: {
        curent: 1,
        total: 0,
      }, 
      params: {},
    }
  }, 
  created() {
    this.params = this.$route.query
    this.getAllUser()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      let pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      let params = this.$route.query
      params.page = this.pagination.current

      this.$router.push({ query: params})
      this.params = params
      this.getAllUser()
    },

    async getAllUser() {
      try {
        this.loading = true
        const response = await axios.get("http://whispering-reef-26272.herokuapp.com/api/v1/users?order=updatedAt", {
          params: this.params,
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        this.loading = false
        if(response.data.status == "200") {
          this.data = response.data.data.rows
          let pagination = { ...this.pagination }
          pagination.total = response.data.data.count
          pagination.current = this.params.page
          this.pagination = pagination
        }
        else {
          this.$notification["error"]({
            message: 'GET USER ERROR',
            description:
              response.data.message
          });
        }
      } catch (e) {
        this.loading = false
        this.$notification["error"]({
            message: 'GET USER ERROR',
            description:
              e.message
          });
      }
    },

    async onChange(record) {
      try {
        const response = await axios.patch(`http://whispering-reef-26272.herokuapp.com/api/v1/users/${record.id}`, {status: record.status}, {
          params: {
            status: record.status,
          },
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        console.log(response)
        if(response.data.status == "200") {
          this.getAllUser()
          this.$notification["success"]({
            message: 'UPDATE STATUS SUCCESS',
            description:
            `Cập nhật trạng thái ${record.name} thành công!`
          });
        }
        else {
          this.$notification["error"]({
            message: 'UPDATE STATUS FAIL',
            description:
            response.data.message
          });
        }
      } catch (e) {
        this.$notification["error"]({
          message: 'UPDATE STATUS  FAIL',
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