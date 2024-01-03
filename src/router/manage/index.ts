import { type RouteRecordRaw } from "vue-router";
//引入模块文件
import manageWriters from "@/views/manage/writers.vue";
import manageUsers from "@/views/manage/users.vue";
import manageOrders from "@/views/manage/orders.vue";
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
        path: "writers",
        component: manageWriters,
        meta: {
          title: "作者管理",
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
        path: "/manage/orders",
        component: manageOrders,
        meta: {
          title: "订单管理",
        },
      },
    ],
  },
];
export default manageRoutes;
