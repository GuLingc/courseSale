import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import userRoutes from "./user/index";
import manageRoutes from "./manage/index";

const routes: Array<RouteRecordRaw> = [...userRoutes,...manageRoutes];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title === "登录") {
    document.title = to.meta.title as string;
    document.body.style.overflow = "hidden"
    document.body.style.backgroundImage = "url('https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/post/20240102110513_a48774c6f5334bd6a04cd954f6c8b1eb.jpg')";
    next();
  } else {
    document.title = to.meta.title as string;
    document.body.style.backgroundImage = "url()";
    next();
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
