<template>
  <div class="header-container">
    <el-header>
      <div class="title">通用管理系统</div>
      <div>{{name}}</div>
    </el-header>
  </div>
</template>

<script>
import {getToken} from '@/utils/token.js'
export default {
  data() {
    return {
      name: 'WangSi',
    };
  },
  created(){
    this.name = getToken('username');
  }
};
</script>

<style lang="less">
.header-container {
  color: #fff;
  height: 60px;
  line-height: 60px;
  background: #0f2027; 
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); 
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); 
  width: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>