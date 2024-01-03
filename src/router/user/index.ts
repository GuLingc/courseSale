import { type RouteRecordRaw } from "vue-router";
//引入模块文件
import Course from "@/views/user/course.vue";
import Login from "@/views/login.vue";
import Index from "@/views/user/index.vue";
import Home from "@/views/user/home.vue";
import Single from "@/views/user/single.vue";
//写路由
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    component: Index,
    redirect: "/home",
    meta: {
      title: "欢迎",
    },
    children: [
      {
        path: "home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "course",
        component: Course,
        meta: {
          title: "课程展示",
        },
      },
      {
        path: "single",
        component: Single,
        meta: {
          title: "课程详情",
        },
      },
    ],
  },
];
export default userRoutes;
