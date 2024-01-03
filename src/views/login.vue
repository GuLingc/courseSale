<template>
  <div class="registerLogin">
    <div class="main">
      <Register :lefts="lefts" :loginShow="loginShow" @updates="updates" />
      <div
        class="center"
        :style="{
          left: lefts + 'px',
          transform: emailShow ? 'rotateY(180deg)' : 'none',
        }"
      >
        <div
          :style="{
            transform: emailShow ? 'rotateY(-180deg)' : 'none',
          }"
        >
          <p class="title">
            {{
              loginShow == true
                ? emailShow == false
                  ? "密码登录"
                  : "邮箱登录"
                : "注册"
            }}
          </p>
          <el-form label-width="80px" class="demo-ruleForm" status-icon>
            <el-form-item label="账户" v-show="!emailShow">
              <el-input placeholder="请输入账户" />
            </el-form-item>
            <el-form-item label="密码" v-show="!emailShow">
              <el-input placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="邮箱" v-show="loginShow == false || emailShow">
              <el-input placeholder="请输入邮箱号" />
            </el-form-item>
            <el-form-item
              label="验证码"
              v-show="loginShow == false || emailShow"
            >
              <el-input placeholder="请输入验证码" />
            </el-form-item>
            <el-form-item>
              <el-button v-show="loginShow == false || emailShow"
                >发送验证码</el-button
              >
              <el-button>登录</el-button>
            </el-form-item>
          </el-form>
          <p class="reset" v-show="loginShow">
            <span @click="emailShow = !emailShow">{{
              emailShow == true ? "密码登录" : "邮箱登录"
            }}</span
            >|<span>忘记密码</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Register from "@/components/register.vue";
let lefts = ref(20);
let loginShow = ref(true);
let emailShow = ref(false);
//注册或登录
function updates(newLefts: number, newLogin: boolean) {
  lefts.value = newLefts;
  loginShow.value = newLogin;
}
</script>

<style lang="scss" scoped>
.registerLogin {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 760px;
    height: 460px;
    padding: 20px 0;
    background-color: rgb(250, 249, 248);
    animation: dropDown 1s ease forwards;
  }
  @keyframes dropDown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .center {
    display: flex;
    position: absolute;
    top: -20px;
    width: 360px;
    height: 500px;
    padding: 20px 20px;
    background-color: rgb(125 126 199);
    align-items: center;
    justify-content: center;
    transition: all 1s;
    p {
      text-align: center;
      color: white;
    }
    .title {
      font-size: 20px;
    }
    .reset {
      font-size: 15px;
    }
    .el-form-item {
      margin-top: 20px;
      :deep(.el-form-item__label) {
        color: white;
        font-size: 18px;
      }
      :deep(.el-input__wrapper) {
        width: 80%;
        outline: none;
        border: none;
        color: white;
        background-color: rgb(125, 126, 199);
        border-bottom: 1px solid white;
        box-shadow: 0 0 0 0px
          var(--el-input-border-color, var(--el-border-color)) inset;
      }
      :deep(.el-form-item__content) {
        margin-left: 0px !important;
        justify-content: space-around;
      }
      .el-button {
        font-size: 18px;
        margin: 10px 0;
      }
    }
    .reset {
      span {
        padding: 0 20px;
        cursor: pointer;
      }
      span:hover {
        color: rgb(203, 160, 190);
      }
    }
  }
}
</style>
