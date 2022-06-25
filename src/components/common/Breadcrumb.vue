<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in $route.matched"
                        :to="{path:item.path}"
                        :key="item.path">{{item.name}}</el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {};
</script>

<style>
</style>