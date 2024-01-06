<template>
  <div class="appHeader" :style="{ backgroundColor: headertype }">
    <div class="bookNav">
      <div class="storeName">智慧星球</div>
      <ul>
        <li
          :class="{ active: clickNav === '/home' }"
          @click="clickNav = '/home'"
        >
          <router-link to="/home">首页</router-link>
        </li>
        <li
          :class="{ active: clickNav === '/course' }"
          @click="clickNav = '/course'"
        >
          <router-link to="/course">课程展示</router-link>
        </li>
        <li
          v-if="userInfo.authority == 1"
          :class="{ active: clickNav === '/manage/users' }"
          @click="clickNav = '/manage/users'"
        >
          <router-link to="/manage/users">进入后台</router-link>
        </li>
        <li
          :class="{ active: clickNav === '1' }"
          @click="
            clickNav = '1';
            editNews = true;
          "
        >
          {{ userInfo.username }}
        </li>
        <li
          :class="{ active: clickNav === '/login' }"
          @click="clickNav = '/login'"
        >
          <span v-if="userId != 0"
            ><router-link to="/login">退出登录</router-link></span
          >
          <router-link v-else to="/login">登录</router-link>
        </li>
      </ul>
    </div>
    <el-dialog title="修改信息" v-model="editNews" width="30%" :before-close="closeShut">
      <el-form :model="userNews" label-width="80px">
        <el-form-item label="账户">
          <el-input :value="userNews.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userNews.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="userNews.sex"
            clearable
            placeholder="请选择"
            width="100%"
          >
            <el-option
              v-for="item in styles"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-input type="date" v-model="userNews.birthday"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userNews.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userNews.phone"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="userNews.introduction"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input :value="userNews.registerTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button @click="closeShut">取 消</el-button>
        <el-button type="primary" @click="editInfos">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { information, updateSelf } from "@/api/user";
import { ElMessage } from "element-plus";
const route = useRoute();
const clickNav = ref(route.path);
let headertype = ref("transparent");
let userInfo = JSON.parse(window.localStorage.getItem("userInfo") || "");
let userId = window.localStorage.userId;
let userNews = ref<any>({});
let editNews = ref(false);
let styles = [
  {
    value: "选项一",
    label: "男",
  },
  {
    value: "选项二",
    label: "女",
  },
];
onMounted(() => {
  document.addEventListener("scroll", handlerscroll);
  goinNews();
});
onUnmounted(() => {
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
const goinNews = () => {
  let obj = {
    userId: userId,
  };
  information(obj)
    .then((res: any) => {
      userNews.value = res.data;
    })
    .catch((error) => {
      console.log("获取用户信息失败");
    });
};
const editInfos = () => {
  let data = {
    birthday: userNews.value.birthday,
    userId: window.localStorage.userId,
    email: userNews.value.email,
    introduction: userNews.value.introduction,
    phone: userNews.value.phone,
    sex: userNews.value.sex,
    username: userNews.value.username,
  };
  updateSelf(data)
    .then((res: any) => {
      console.log("修改个人信息", res);

      if (res.code == 20000) {
        ElMessage.success("修改成功");
        editNews.value = false;
        window.localStorage.setItem("userInfo", JSON.stringify(userNews.value));
        userInfo = userNews.value
      }
    })
    .catch((error) => {
      ElMessage.error("修改信息失败");
    });
};
const closeShut =()=>{
  editNews.value = false;
  userNews.value=userInfo
}
</script>

<style lang="scss" scoped>
.appHeader {
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
      width: 110px;
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
