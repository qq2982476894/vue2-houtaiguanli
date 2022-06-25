<template>
  <div class="users-container">
    <el-tree :data="menus"
             show-checkbox
             node-key="name"
             ref="tree"
            
             :props="defaultProps">
    </el-tree>
    <el-button @click="getCheckedNodes">通过node获取</el-button>
  </div>
</template>

<script>

export default {
    data() {
        return {
            menus:[],
            defaultProps:{
                label:'name',
                children:'children',
            }
        }
    },
    created(){
        this.menus = [...this.$router.options.routes]
        console.log(this.menus);
    },
    methods:{
        getCheckedNodes(){
            const arr = this.$refs.tree.getCheckedNodes();
            console.log(arr);
        }
    }
};
</script>

<style>
</style>