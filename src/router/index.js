import {
  createRouter,
  createWebHistory
} from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/maskmap',
      component: () => import('@/views/MaskmapView.vue'),
    },
    {
      path: '/weater',
      component: () => import('@/views/WeaterView.vue'),
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
    },
    {
      path: "/cardscomponents",
      component:() => import('@/components/Cardscomponents.vue'),
    },
    {
      path: "/add-city",
      component:() => import('@/components/Blog/AddCity.vue'),
    },
    {
      path: "/blogs/:blogId",
      component:() => import('@/components/Blog/EditCity.vue'),
    },
    {
      path: "/blog",
      component: () => import("@/views/BlogView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (uesr) => {
        removeListener();
        resolve(uesr);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("無訪問權限 ! ");
      next("/");
    }
  } else {
    next();
  }
});
export default router;