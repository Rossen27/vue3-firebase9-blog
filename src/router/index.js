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
      path: '/login',
      component: () => import('@/components/Login.vue'),
    },
  ]
});
export default router;
