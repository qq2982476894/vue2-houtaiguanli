<template>
  <div class="info-list-container table-container">
    <el-button type="primary"
               size="small"
               @click="addInfo">新增</el-button>
    <el-dialog :title="dialogState?'新增信息':'编辑信息'"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               label-width="80px">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄"
                      prop="age">
          <el-input type="number"
                    v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <el-radio v-model="form.sex"
                    label="1">男</el-radio>
          <el-radio v-model="form.sex"
                    label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="父亲姓名"
                      prop="father">
          <el-input v-model="form.father"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名"
                      prop="mather">
          <el-input v-model="form.mather"></el-input>
        </el-form-item>
        <el-form-item label="入校时间"
                      prop="time">
          <el-date-picker v-model="form.time"
                          type="date"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          size="large"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家庭住址"
                      prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"
                      prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <div align="right">
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="close('form')">取 消</el-button>
            <el-button type="primary"
                       @click="addInfoSure('form')">确 定</el-button>
          </span>
        </div>

      </el-form>

    </el-dialog>
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
      <el-table-column prop="father"
                       label="父亲姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="mather"
                       label="母亲姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="time"
                       label="入校时间"
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
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="edit(scope)">编辑</el-button>
          </div>
          <div>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       @click="deleteRow(scope)">删除</el-button>
          </div>

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
      loading: true,
      dialogState: true, //true为新增，false为编辑
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        sex: [{ required: true, message: '请选择性别' }],
        age: [{ required: true, message: '选输入年龄' }],
        address: [{ required: true, message: '请输入家庭住址' }],
        time: [{ required: true, message: '请选择入学时间' }],
        phone: [{ required: true, message: '请输入联系方式' }],
      },
      form: {
        name: '',
        age: '',
        sex: '1',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
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
      list = this.tableData.slice(
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
    async getTableData() {
      let { data, total, status, message } = await this.$axios.getInfoList();
      if (status === 200) {
        this.total = total;
        this.tableData = data;
        this.loading = false;
      } else {
        return new Error(`${status}---${message}`);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    addInfo() {
      this.dialogVisible = true;
      this.dialogState = true;
    },
    addInfoSure(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          if (this.dialogState) {
            await this.$axios.addInfoList(this.form);
            this.$message({ type: 'success', message: '添加成功' });
          } else {
            await this.$axios.updateInfo(this.form);
            this.$message({ type: 'success', message: '修改成功' });
          }
          this.getTableData();
          this.close('form');
        } else {
          alert('信息填写错误，请重新填写');
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    close(form) {
      this.form = {
        name: '',
        age: '',
        sex: '1',
        father: '',
        mather: '',
        time: '',
        address: '',
        phone: '',
      };
      this.dialogVisible = false;
      this.$refs[form].resetFields();
    },
    edit(scope) {
      const { row } = scope;
      this.dialogVisible = true;
      this.dialogState = false;
      this.form = { ...row };
      this.form['sex'] = row['sex'] == '男' ? '1' : '2';
    },
    async deleteRow(scope) {
      const id = scope.row;
      this.$axios.deleteStudent('/info', id);
    },
  },
};
</script>

<style lang="less">
</style>