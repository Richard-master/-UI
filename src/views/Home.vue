<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header style="border-bottom: 1px solid lightgray;">
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-divider style="margin: 5px"></el-divider>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import CommonAside from "../components/CommonAside";
  import CommonHeader from "../components/CommonHeader";
  import CommonTag from "../components/CommonTag";
  export default {
    name: "Home",
    components: { CommonAside,CommonHeader,CommonTag },
  };
</script>
<style scoped>
  .el-divider{
    margin: 10px auto;
  }
  .el-main{
    padding: 10px;
    margin: 0;
  }
</style>