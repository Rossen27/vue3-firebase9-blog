import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
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
      path: '/wheater',
      component: () => import('@/views/WheaterView.vue'),
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
    },
  ]
});
export default router;
