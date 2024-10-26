import { LOGIN_URL } from "@/config";
import NProgress from "@/config/nprogress";
import { useUserStore } from "@/store/modules/user";
import type { App } from "vue";
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "homepage",
          affix: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/map/index.vue"),
    meta: { hidden: true },
  },
];
/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  NProgress.start();
  if (whiteList.includes(to.path)) return next();
  if (to.path !== "/login" && !userStore.token) return next({ path: LOGIN_URL, replace: true });
  next();
});
router.afterEach(() => {
  NProgress.done();
});
/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
