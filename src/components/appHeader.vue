<template>
  <div class="appHeader" :style="{ backgroundColor: headertype }">
    <div class="bookNav">
      <div class="storeName">智慧星球</div>
      <ul>
        <li :class="{ active: clickNav === 1 }" @click="clickNav = 1">
          <router-link to="/home">首页</router-link>
        </li>
        <li :class="{ active: clickNav === 2 }" @click="clickNav = 2">
          <router-link to="/course">课程展示</router-link>
        </li>
        <li :class="{ active: clickNav === 3 }" @click="clickNav = 3">
          <router-link to="/manage/users">进入后台</router-link>
        </li>
        <li :class="{ active: clickNav === 4 }" @click="clickNav = 4">
          <span v-if="userId != 0">退出登录</span>
          <router-link v-else to="/login">登录</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const clickNav = ref(1);
let headertype = ref("transparent");
let userId = window.localStorage.userId
onMounted(() => {
  document.addEventListener("scroll", handlerscroll);
  //绑定事件
});
onUnmounted(() => {
  //卸载解绑
  document.removeEventListener("scroll", handlerscroll);
});
//切换演示
function handlerscroll() {
  let scrolly = window.scrollY;
  if (scrolly >= 100) {
    headertype.value = "rgba(36, 35, 35, 0.22)";
  } else {
    headertype.value = "transparent";
  }
}
</script>

<style lang="scss" scoped>
.appHeader{
  position: fixed;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid #ffffff59;
}
.bookNav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  .storeName {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
  ul {
    display: flex;
    height: 40px;
    li {
      line-height: 40px;
      width: 90px;
      margin-left: 7px;
      text-align: center;
      cursor: pointer;
      transition: all 0.8s;
      border-radius: 18px;
      color: white;
      a {
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        background-color: transparent;
      }
    }
    li:hover {
      background-color: rgb(179, 106, 231);
    }
    .active {
      border-radius: 18px;
      color: white;
      background-color: rgb(179, 106, 231);
    }
  }
}
</style>
