import MainLayout from '@/layouts/MainLayout.vue';

export default [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'chat',
          component: () => import('@/modules/chat/ChatPage.vue')
        },
        {
          path: 'dashboard',
          component: () => import('@/modules/dashboard/DashboardPage.vue')
        },
        {
          path: 'knowledge',
          component: () => import('@/modules/knowledge/KnowledgePage.vue')
        },
      ]
    },
    {
      path: '/settings/system',
      component: () => import('@/modules/settings/SystemSettings.vue')
    },
    {
      path: '/settings/account',
      component: () => import('@/modules/settings/AccountSettings.vue')
    }
  ];
