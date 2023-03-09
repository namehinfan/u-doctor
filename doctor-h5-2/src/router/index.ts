import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from '@/stores';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', 
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        { path: "/home", 
          component: () => import("@/views/Home/index.vue"),
          meta: { title: '首页' }
        },
        {
          path: "/article",
          component: () => import("@/views/Article/index.vue"),
          meta: { title: '健康百科' }
        },
        { path: "/notify", 
          component: () => import("@/views/Notify/index.vue"),
          meta: { title: '消息通知' }, 
        },
        { path: "/user", 
          component: () => import("@/views/User/index.vue"),
          meta: { title: '个人中心' } 
        },
      ]
    },
    { 
      path: '/login', 
      component:  () => import('@/views/Login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    }
  ]
})

NProgress.configure({
  showSpinner: false,
});

router.beforeEach((to) => {
  const store = useUserStore();
  const whiteList = ["/login"];
  NProgress.start()
  if (!store.userInfo?.token && !whiteList.includes(to.path)) return "/login";
})

router.afterEach((to) => {
  document.title = `优医问诊-${to.meta.title || ''}`
  NProgress.done();
});

export default router
