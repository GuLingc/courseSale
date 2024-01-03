import { type RouteRecordRaw } from "vue-router";
//引入模块文件
import Book from "@/views/user/books.vue";
import Login from "@/views/login.vue";
import Index from "@/views/user/index.vue";
import Home from "@/views/user/home.vue";
import Order from "@/views/user/order.vue";
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
        path: "/home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "/books",
        component: Book,
        meta: {
          title: "图书展示",
        },
      },
      {
        path: "/orders",
        component: Order,
        meta: {
          title: "我的订单",
        },
      },
    ],
  },
];
export default userRoutes;
