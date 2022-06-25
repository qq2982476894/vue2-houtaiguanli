<template>
  <div class="login-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>通用后台管理系统</span>
      </div>
      <el-form :model="form"
               ref="form"
               label-width="80px"
               :rules="rules"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('form')">登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { checkUsername, checkPassword } from '@/utils/validate.js';
import { setToken } from '@/utils/token.js';
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const {status,username,token} = await this.$axios.login(this.form);
          if (status === 200) {
            setToken('username',username);
            setToken('token',token);
            this.$message({
              message: '登录成功',
              type: 'success',
            });
            this.$router.push('/home');
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  .box-card {
    background: transparent;
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 5px rgb(255, 255, 255);
    width: 450px;
    margin: 200px auto;
    .el-card__header div {
      font-size: 28px;
      color: #fff;
      text-shadow: 1px 2px 5px #000;
    }
    .el-form .el-form-item__label {
      color: #fff;
      text-shadow: 1px 2px 3px #000;
    }
    .el-button {
      width: 48%;
    }
  }
  //   background: url('~assets/bg.jpg') no-repeat center;
  //   background-size: cover;
  background: #2980b9;
  background: -webkit-linear-gradient(to bottom, #ffffff, #6dd5fa, #2980b9);
  background: linear-gradient(to bottom, #ffffff, #6dd5fa, #2980b9);

  background: #141e30;
  background: -webkit-linear-gradient(to bottom,#3d4854, #243b55, #141e30);
  background: linear-gradient(to bottom, #3d4854,#243b55, #141e30);
}
</style>