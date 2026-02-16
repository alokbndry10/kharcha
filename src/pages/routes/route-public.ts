import { lazy } from 'react';
import { AppRoute } from './route.types';
const ModuleLogin = lazy(() => import('@modules/auth/login/login.page'));
const NotFound = lazy(() => import('@pages/route-not-found'));
const RootRedirect = lazy(() => import('@modules/auth/common/root-redirect'));

export const publicRoutes: AppRoute[] = [
  {
    type: 'render',
    path: '/',
    component: RootRedirect,
  },
  {
    type: 'render',
    path: '/login',
    component: ModuleLogin,
  },
  {
    type: 'render',
    path: '*',
    component: NotFound,
    breadcrumbs: [{ title: 'Not Found' }],
  },
];
