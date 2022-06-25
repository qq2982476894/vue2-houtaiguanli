<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[5, 10, 15, 20]"
                 :page-size="pageSize"
                 background
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
</style>