<template>
  <div class="student-list-container">
    <el-form :inline="true"
             size="small"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.name"
                  placeholder="请输入姓名查询"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="search">查询</el-button>
        <el-button type="primary"
                   @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageTableData"
              border
              v-loading="loading"
              style="width: 100%">
      <el-table-column prop="name"
                       label="姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       align="center">
      </el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       align="center">
      </el-table-column>
      <el-table-column prop="number"
                       label="学号"
                       align="center">
      </el-table-column>
      <el-table-column prop="class"
                       label="班级"
                       align="center">
      </el-table-column>
      <el-table-column prop="state"
                       label="状态"
                       align="center">

      </el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       align="center"
                       width="180">
      </el-table-column>
      <el-table-column prop="phone"
                       label="联系方式"
                       align="center">
      </el-table-column>
      <el-table-column label="删除"
                       align="center">
        <template slot-scope="scope">
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-delete"
                     @click="deleteRow(scope)"></el-button>
        </template>
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
      formInline: {},
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      loading:true
    };
  },
  computed: {
    FomatTableData() {
      return this.tableData.map((item) => {
        return {
          ...item,
          sex: item.sex == 2 ? '女' : '男',
          state:
            item.state == 1 ? '已入学' : item.state == 2 ? '未入学' : '休学中',
        };
      });
    },
    pageTableData() {
      let list = [];
      list = this.FomatTableData.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * this.pageSize
      );
      return list;
    },
  },
  async created() {
    this.getTableData();
  },
  methods: {
    async getTableData(params) {
      let { data, total, status, message } = await this.$axios.getStudentsList(
        params
      );
      if (status === 200) {
        this.total = total;
        this.tableData = data;
        this.loading = false;
      } else {
        return new Error(`${status}---${message}`);
      }
    },
    async deleteRow(scope) {
      const { id } = scope.row;
      await this.$axios.deleteStudent('/students', id);
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    search() {
      this.getTableData(this.formInline);
    },
    reset() {
      this.formInline = {};
      this.getTableData();
    },
  },
};
</script>

<style lang="less">
.student-list-container {
  width: 100%;
  height: 100%;
  .el-form {
    display: flex;
    align-items: center;
    height: 50px;
    .el-form-item {
      margin: 0;
    }
  }
  .el-table tr,
  .el-table th {
    background: rgb(38, 72, 85);
    color: #fff;
  }
  .el-table tr:hover {
    color: #000;
  }
  .el-table {
    box-shadow: 2px 4px 5px #000;
  }
  .el-pagination {
    padding: 20px 10px 15px 10px;
  }
}
</style>