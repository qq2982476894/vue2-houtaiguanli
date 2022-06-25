<template>
  <div class="work-list-container table-container">
    <el-table :data="FomatTableData"
              border
              style="width: 100%"
              v-loading="loading">
      <el-table-column prop="id"
                       label="用户ID"
                       align="center">
      </el-table-column>
      <el-table-column prop="userId"
                       label="所属班级"
                       align="center">
      </el-table-column>
      <el-table-column prop="title"
                       label="作业名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="completed"
                       label="完成情况"
                       align="center">
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pageSize"
                   background
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      loading: true,
    };
  },
  computed: {
    FomatTableData() {
      return this.tableData.map((item) => {
        return {
          ...item,
          completed: item.completed ? '是' : '否',
        };
      });
    },
  },
  methods: {
    async getTableData(params) {
      let { data, total, status, message } = await this.$axios.getWorksList(
        params
      );
      if (status === 200) {
        this.total = total;
        this.tableData = data;
        this.loading = false;
        console.log(this.tableData);
      } else {
        return new Error(`${status}---${message}`);
      }
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData({ page: 1, size: val });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.getTableData({ page: val, size: this.pageSize });
    },
  },
  created() {
    this.getTableData({ page: this.currentPage, size: this.pageSize });
  },
};
</script>

<style lang="less">
</style>