<template>
    <div class="bookNav">
      <div class="storeName">智慧星球</div>
      <ul>
        <li :class="{ active: clickNav === 1 }" @click="clickNav = 1">
          <router-link to="/home">首页</router-link>
        </li>
        <li :class="{ active: clickNav === 2 }" @click="clickNav = 2">
          <router-link to="/books">课程展示</router-link>
        </li>
        <li :class="{ active: clickNav === 3 }" @click="clickNav = 3">
          <router-link to="/orders">我的订单</router-link>
        </li>
        <li :class="{ active: clickNav === 4 }" @click="clickNav = 4">
          <router-link to="/manage/users">进入后台</router-link>
        </li>
        <li :class="{ active: clickNav === 5 }" @click="clickNav = 5">
          <router-link v-if="loginState == false" to="/login">登录</router-link>
          <span v-if="loginState == true">游客</span>
        </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loginState = ref(false);
const clickNav = ref(1);
</script>

<style lang="scss" scoped>
.bookNav {
  position: fixed;
  display: flex;
  width: 80%;
  left: 7%;
  justify-content: space-between;
  padding: 30px 20px;
  z-index: 2;
  border-bottom: 1px solid #ffffff59;
  .storeName {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
  ul {
    display: flex;
    font-family: "PingFang SC";
    li {
      width: 90px;
      margin-left: 7px;
      padding: 6px 0px;
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
