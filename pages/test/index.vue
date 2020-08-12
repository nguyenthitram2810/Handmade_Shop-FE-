<template>
  <a-table
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }} </template>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export default {
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      console.log(filters);
      console.log(sorter);
      // const pager = { ...this.pagination };
      // pager.current = pagination.current;
      // this.pagination = pager;
      // this.fetch({
      //   results: pagination.pageSize,
      //   page: pagination.current,
      //   sortField: sorter.field,
      //   sortOrder: sorter.order,
      //   ...filters,
      // });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>