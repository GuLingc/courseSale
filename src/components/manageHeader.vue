<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-menu-item index="1" disabled>
      <el-icon><document /></el-icon>
      <template #title>后台管理系统</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>人员管理</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>课程管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>讲师管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 100vh;
  background-color: rgba(101, 168, 235, 0);
  .el-menu-item {
    color: aliceblue;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
  .el-sub-menu__title * {
    color: aliceblue;
    .el-menu-item {
      color: black !important;
    }
  }
  .el-sub-menu .el-menu-item {
    color: black !important;
  }
  .el-sub-menu__title:hover * {
    color: rgb(101, 167, 235) !important;
    background-color: aliceblue;
  }
  li:hover {
    color: rgb(101, 167, 235) !important;
    background-color: aliceblue;
  }
  .el-menu-item.is-active {
    color: rgb(101, 167, 235) !important;
    background-color: aliceblue;
    svg {
      color: rgb(101, 167, 235) !important;
    }
  }
}
</style>
