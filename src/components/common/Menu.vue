<template>
  <div class="menu-container">
    <el-menu :default-active="select"
             class="el-menu-vertical-demo"
             background-color="transparent"
             text-color="#fff"
             :router="true"
             unique-opened
             @select="handleOpen"
             active-text-color="#ffd04b">
      <template v-for="(item,index) in menuList">
        <el-submenu 
                    :index="index+''"
                    v-if="!item.hidden"
                    :key="item.name">
          <template slot="title">
            <i :class="item.iconClass"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="child in item.children"
                              :key="child.name">
            <el-menu-item :index="child.path">
              <i :class="child.iconClass"></i>
              {{child.name}}
            </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      menuList: [],
      select:location.pathname
    };
  },
  computed:{
    
  },
  methods: {
    handleOpen(index) {
      console.log(index);
    },
  },
  created() {
    this.menuList = this.$router.options.routes;
  },
  watch:{
    $route(to){
        this.select = to.fullPath;
    },
    immediate:true
  }
};
</script>

<style lang="less">
.menu-container {
  overflow-y: scroll;
  height: calc(100vh - 60px);
  background: #0f2027;
  background: -webkit-linear-gradient(to bottom, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to bottom, #2c5364, #203a43, #0f2027);
}
.menu-container {
  .el-menu {
    height: 100%;
    width: 100%;
    .el-submenu__title {
      padding-left: 0 !important;
    }
    .fa {
      margin-right: 10px;
    }
  }
}
.menu-container::-webkit-scrollbar {
  display: none;
}
</style>