export default [
    { path: '/', redirect: '/prototype' },
    {
      path: '/chat',
      component: () => import('@/modules/chat/ChatPage.vue')
    },
    {
      path: '/prototype',
      component: () => import('@/modules/prototype/PrototypePage.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/modules/dashboard/DashboardPage.vue')
    },
    {
      path: '/knowledge',
      component: () => import('@/modules/knowledge/KnowledgePage.vue')
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
