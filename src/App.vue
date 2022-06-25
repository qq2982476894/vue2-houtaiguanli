<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
@import url('assets/css/reset.css');
html,body{
    width: 100%;
    height: 100%;
}
#app {
    width: 100%;
    height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.table-container {
  width: 100%;
  height: 100%;

  .el-dialog__body {
    padding: 30px 40px;
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
