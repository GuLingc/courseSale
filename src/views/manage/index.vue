<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="1" disabled>
            <el-icon><document /></el-icon>
            <template #title>后台管理系统</template>
          </el-menu-item>
          <el-menu-item index="/manage/users">
            <el-icon><User /></el-icon>
            <template #title
              ><router-link to="/manage/users" class="router-link">
                人员管理
              </router-link></template
            >
          </el-menu-item>
          <el-menu-item index="/manage/lessons">
            <el-icon><document /></el-icon>
            <template #title
              ><router-link to="/manage/lessons"
                >课程管理</router-link
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/manage/scholars">
            <el-icon><Filter /></el-icon>
            <template #title
              ><router-link to="/manage/scholars"
                >讲师管理</router-link
              ></template
            >
          </el-menu-item>
          <el-menu-item index="/home">
            <el-icon><document /></el-icon>
            <template #title
              ><router-link to="/home"
                >返回首页</router-link
              ></template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <el-icon
              size="20px"
              v-if="isCollapse == false"
              @click="handleFold()"
              ><Fold
            /></el-icon>
            <el-icon size="20px" v-if="isCollapse == true" @click="handleFold()"
              ><Expand
            /></el-icon>
          </div>
          <div>
            <el-avatar
              :size="32"
              class="mr-3"
              :src="userInfo.userPicture"
            />
            <span class="text-large font-600 mr-3" style="font-size:15px"> {{ userInfo.username }} </span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  Filter,
  Document,
  Menu as IconMenu,
  Fold,
  Expand,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
let isCollapse = ref(false);
let defaultRoute = ref("");
let userInfo = JSON.parse(window.localStorage.getItem("userInfo")||'')

onMounted(() => {
  defaultRoute.value = route.path;
});
const handleFold = () => {
  isCollapse.value = !isCollapse.value;
};

</script>

<style lang="scss" scoped>
//侧边导航
.el-aside {
  width: max-content;
  min-height: 100vh;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 100vh;
    background-color: rgba(101, 168, 235, 0);
    .el-menu-item {
      color: aliceblue;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
      }
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
}
//头部导航
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 4px #c1c0c0;
  svg:hover {
    color: rgb(101, 167, 235);
    cursor: pointer;
  }
}
</style>
