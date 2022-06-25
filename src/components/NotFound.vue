<template>
  <div class="not-found">
        <div class="box">
            <h1>404</h1>
            <h2>UH NO! 页面丢失</h2>
            <p>您所寻找的页面不存在，你可以点击下面的按钮，返回登录页</p>
            <router-link :to="{name:'login'}">
            <el-button type="primary">返回登录</el-button>
            </router-link>
            
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.not-found {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box{
     background: url('~assets/404.png') no-repeat;
     background-position-x: -50px;
     padding-left: 500px;
     min-height: 360px;
    text-align: left;
}
.box h1{
    font-size: 128px;
    margin-bottom: 20px;
}
.box h2{
    font-size: 56px;
    margin-bottom: 15px;
}
.box p{
    margin-bottom: 20px;
}
</style>