<template>
    <a-layout style="padding: 12px 12px 12px" class="product">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-tabs default-active-key="2" @change="callback">
          <a-tab-pane to="/" key="1" tab="Tất cả">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Còn hàng" force-render>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Hết hàng">
          </a-tab-pane>
        </a-tabs>
        <div class="d-flex justify-content-between">
          <a-input-search placeholder="Nhập tên sản phẩm" style="width: 400px"/>
          <a-button icon="plus" class="bg-button-orange al-color-white">
            Thêm sản phẩm
          </a-button>
        </div>
        <a-table class="pt-4" :columns="columns" :data-source="data" bordered>
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
          </span>
        </a-table>
      </a-layout-content>
    </a-layout>
</template>

<script>
export default {
    layout: 'layoutSidebar',
    middleware: ['authentication'],
    data() {
      return {
        columns: [
          {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' },
          },
          {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          },
          {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          },
          {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' },
          },
          {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          },
        ],

        data: [
          {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
          },
          {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
          },
          {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
          },
        ]
      };
  },
  methods: {
    callback(key) {
      if(key == 1) {
        this.$router.push('/shop/manage/product/list/all')
      }
      if(key == 3) {
        this.$router.push('/shop/manage/product/list/soldout')
      }
    },
  },
}
</script>

<style scoped>
@import url("./style.scss");
</style>