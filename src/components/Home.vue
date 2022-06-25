<template>
  <div class="home-container">
    <Header />
    <el-container>
      <el-aside width="180px">
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
            <div class="bread">
                <Breadcrumb />
            </div>
          <router-view></router-view>
        </el-main>
        <el-footer height="30px">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import Menu from '@/components/common/Menu.vue';
import Breadcrumb from './common/Breadcrumb.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Menu,
    Breadcrumb
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home-container {
  height: 100%;
  .el-aside {
    width: 180px;
    text-align: center;
  }
  .el-main {
    text-align: left;
    position: relative;
    
    height: calc(100vh - 90px);
    .bread{
        position: absolute;
        left: 5px;
        top: 5px;
    }
  }
  .el-footer {
    padding: 0;
  }
}
</style>
