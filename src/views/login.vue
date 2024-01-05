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
          <el-form
            ref="ruleFormRef"
            :model="userinfo"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="账户" v-if="!emailShow" prop="account">
              <el-input placeholder="请输入账户" v-model="userinfo.account" />
            </el-form-item>
            <el-form-item label="密码" v-if="!emailShow" prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="userinfo.password"
              />
            </el-form-item>
            <el-form-item
              label="邮箱"
              v-if="loginShow == false || emailShow"
              prop="email"
            >
              <el-input placeholder="请输入邮箱号" v-model="userinfo.email" />
            </el-form-item>
            <el-form-item
              label="验证码"
              v-if="loginShow == false || emailShow"
              prop="code"
            >
              <el-input placeholder="请输入验证码" v-model="userinfo.code" />
            </el-form-item>
            <el-form-item>
              <el-button
                :disabled="sendSuccess"
                v-show="loginShow == false || emailShow"
                @click="sendCode"
                >{{
                  sendSuccess ? sendNum + "s后重新发送" : "发送验证码"
                }}</el-button
              >
              <el-button @click="submitForm(ruleFormRef)">
                {{ loginShow == true ? "登录" : "注册" }}</el-button
              >
            </el-form-item>
          </el-form>
          <p class="reset" v-show="loginShow">
            <span @click="emailShow = !emailShow">{{
              emailShow == true ? "密码登录" : "邮箱登录"
            }}</span
            >|<span @click="seedialogVisible = true">忘记密码</span>
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      title="忘记密码"
      v-model="seedialogVisible"
      width="30%"
      :before-close="closeRest"
    >
      <el-form ref="userInfos" :model="restUserinfo" label-width="80px">
        <el-form-item label="邮箱">
          <el-input v-model="restUserinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="restUserinfo.code"> </el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="restUserinfo.password"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button type="success" :disabled="sendRest" @click="restCode">{{
          sendRest ? sendNum + "s后重新发送" : "发送验证码"
        }}</el-button>
        <el-button type="primary" @click="restPassword">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Register from "@/components/register.vue";
import {
  sendEmail,
  userRegister,
  accountLogin,
  emailLogin,
  forgetPassword,
  information,
} from "@/api/user";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
const router = useRouter();
let lefts = ref(20);
interface infoType {
  account: string;
  password: string;
  email: string;
  code: string;
  newpassword: string;
}
const ruleFormRef = ref<FormInstance>();
let userinfo = ref<infoType>({
  account: "",
  password: "",
  email: "",
  code: "",
  newpassword: "",
});
let restUserinfo = ref({
  password: "",
  email: "",
  code: "",
});
let sendNum = ref(60);
let sendRest = ref(false);
let sendSuccess = ref(false);
let loginShow = ref(true);
let emailShow = ref(false);
let seedialogVisible = ref(false);
const rules = reactive<FormRules<infoType>>({
  account: [
    { required: true, message: "请输入账户", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]{6,8}$/,
      message: "账户必须由6-8位的字母或数字组成",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
      message: "密码必须由6-10位的字母和数字组成，且至少包含一个字母和一个数字",
      trigger: "blur",
    },
  ],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }, {}],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }, {}],
});
//注册或登录状态切换
function updates(newLefts: number, newLogin: boolean) {
  lefts.value = newLefts;
  loginShow.value = newLogin;
}
//发送验证码
const sendCode = () => {
  let types = loginShow.value ? "login" : "register";
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (regEmail.test(userinfo.value.email)) {
    let data = {
      email: userinfo.value.email,
      operate: types,
    };
    sendEmail(data)
      .then((res: any) => {
        if (res.data == 20000) {
          ElMessage.success("已发送验证码");
        }
        sendSuccess.value = true;
        sendNum.value = 60;
        const timer = setInterval(() => {
          sendNum.value = sendNum.value - 1;
          if (sendNum.value == 0) {
            sendSuccess.value = false;
            clearInterval(timer);
          }
        }, 1000);
      })
      .catch((error) => {
        ElMessage.error("发送验证码失败");
      });
  } else {
    ElMessage.warning("请输入正确的邮箱号");
  }
};
//用户注册/登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let loginu = loginShow.value ? true : false;
      if (loginu) {
        if (emailShow.value) {
          console.log("邮箱登录");
          let data = {
            code: userinfo.value.code,
            email: userinfo.value.email,
          };
          emailLogin(data)
            .then((res: any) => {
              if (res.code == 20000) {
                ElMessage.success("登录成功");
                userinfo.value.account = "";
                userinfo.value.password = "";
                window.localStorage.setItem("userId", res.data.userId);
                window.localStorage.setItem("authority", res.data.authority);
                let obj = {
                  userId: res.data.userId,
                };
                information(obj)
                  .then((res: any) => {
                    window.localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data)
                    );
                  })
                  .catch((error) => {
                    console.log("获取用户信息失败");
                  });
                router.push("/home");
              } else {
                ElMessage.error("登录失败");
              }
            })
            .catch((error) => {
              ElMessage.error("登录失败");
            });
        } else {
          console.log("密码登录");
          let data = {
            account: userinfo.value.account,
            password: userinfo.value.password,
          };
          accountLogin(data)
            .then((res: any) => {
              if (res.code == 20000) {
                ElMessage.success("登录成功");
                userinfo.value.account = "";
                userinfo.value.password = "";
                window.localStorage.setItem("userId", res.data.userId);
                window.localStorage.setItem("authority", res.data.authority);
                let obj = {
                  userId: res.data.userId,
                };
                information(obj)
                  .then((res: any) => {
                    window.localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data)
                    );
                  })
                  .catch((error) => {
                    console.log("获取用户信息失败");
                  });
                router.push("/home");
              } else {
                ElMessage.error("登录失败");
              }
            })
            .catch((error) => {
              ElMessage.error("登录失败");
            });
        }
      } else {
        let data = {
          account: userinfo.value.account,
          code: userinfo.value.code,
          email: userinfo.value.email,
          password: userinfo.value.password,
        };
        userRegister(data)
          .then((res: any) => {
            if (res.code == 20000) {
              ElMessage.success("注册成功");
              userinfo.value.account = "";
              userinfo.value.code = "";
              userinfo.value.email = "";
              userinfo.value.password = "";
              sendSuccess.value = false;
            } else {
              ElMessage.error(res.message);
            }
          })
          .catch((error) => {
            ElMessage.error("注册失败");
          });
      }
    } else {
      ElMessage.warning("请完善信息");
    }
  });
};

//重置密码
//发送验证码
const restCode = () => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (regEmail.test(restUserinfo.value.email)) {
    let data = {
      email: restUserinfo.value.email,
      operate: "forget",
    };
    sendEmail(data)
      .then((res: any) => {
        if (res.code == 20000) {
          ElMessage.success("已发送验证码");
        }
        sendRest.value = true;
        sendNum.value = 60;
        const timer = setInterval(() => {
          sendNum.value = sendNum.value - 1;
          if (sendNum.value == 0) {
            sendRest.value = false;
            clearInterval(timer);
          }
        }, 1000);
      })
      .catch((error) => {
        ElMessage.error("发送验证码失败");
      });
  } else {
    ElMessage.warning("请输入正确的邮箱号");
  }
};
//修改密码
const restPassword = () => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
  if (regEmail.test(restUserinfo.value.email)) {
    if (regPassword.test(restUserinfo.value.password)) {
      if (restUserinfo.value.code.trim()) {
        let data = {
          code: restUserinfo.value.code,
          email: restUserinfo.value.email,
          newPassword: restUserinfo.value.password,
        };
        forgetPassword(data)
          .then((res: any) => {
            console.log("重置密码", res);

            if (res.code == 20000) {
              ElMessage.success("密码重置成功");
              restUserinfo.value.code = "";
              restUserinfo.value.email = "";
              restUserinfo.value.password = "";
              seedialogVisible.value = false;
            } else {
              ElMessage.error("密码重置失败");
            }
          })
          .catch((error) => {
            ElMessage.error("密码重置失败");
          });
      } else {
        ElMessage.warning("验证码不能为空");
      }
    } else {
      ElMessage.warning(
        "密码必须由6-10位的字母和数字组成,且至少包含一个字母和一个数字"
      );
    }
  } else {
    ElMessage.warning("邮箱号不正确");
  }
};
//关闭弹窗
const closeRest = () => {
  restUserinfo.value.code = "";
  restUserinfo.value.email = "";
  restUserinfo.value.password = "";
  seedialogVisible.value = false;
};
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
      :deep(.el-input__inner) {
        color: white;
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
