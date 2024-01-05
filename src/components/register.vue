<template>
  <ul>
    <li>
      <p class="xtitle">智慧星球</p>
      <p>伴你一路前行</p>
      <div>
        <img src="@/assets/images/女主.jpeg" />
      </div>
      <p class="news">欢迎登录</p>
      <div><button @click="changes(20,'login')">登录</button></div>
    </li>
    <li>
      <p class="xtitle">智慧星球</p>
      <p>伴你一路前行</p>
      <div>
        <img src="@/assets/images/男主.jpeg" />
      </div>
      <p class="news">还没账户？</p>
      <div><button @click="changes(380,'regist')">注册</button></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps({
  lefts: Number,
  loginShow: Boolean,
});
const emit = defineEmits(["updates"]);
let leftMargin = ref(props.lefts);
let loginView = ref(props.loginShow)
function changes(lefts: number,str:String) {
  leftMargin.value = lefts;
  if(str == "login"){
    loginView.value = true
    emit("updates",leftMargin.value,loginView.value);
  }else{
    loginView.value = false
    emit("updates",leftMargin.value,loginView.value);
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  width: 100%;
  height: 100%;
  li {
    width: 380px;
    p {
      width: 100%;
      font-size: 17px;
      color: #bcbaba;
      text-align: center;
    }
    div {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 15px;
      img {
        width: 240px;
        height: 240px;
      }
      button {
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
        border: 1px solid rgb(125 126 199);
        color: rgb(125 126 199);
        background-color: white;
        cursor: pointer;
        transition: all 0.7s;
      }
      button:hover {
        color: white;
        background-color: rgb(125 126 199);
      }
    }
  }
}
.xtitle {
  color: rgb(125 126 199);
  font-size: 25px;
}
.news {
  margin-top: 15px;
}
</style>
