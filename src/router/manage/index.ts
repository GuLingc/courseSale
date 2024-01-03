import { type RouteRecordRaw } from "vue-router";
//引入模块文件
import manageScholars from "@/views/manage/scholar.vue";
import manageUsers from "@/views/manage/users.vue";
import manageLessons from "@/views/manage/lesson.vue";
import Manage from "@/views/manage/index.vue";
//写路由
const manageRoutes: Array<RouteRecordRaw> = [
  {
    path: "/manage",
    component: Manage,
    redirect: "/manage/users",
    meta: {
      title: "后台管理",
    },
    children: [
      {
        path: "scholars",
        component: manageScholars,
        meta: {
          title: "讲师管理",
        },
      },
      {
        path: "users",
        component: manageUsers,
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "lessons",
        component: manageLessons,
        meta: {
          title: "课程管理",
        },
      },
    ],
  },
];
export default manageRoutes;
