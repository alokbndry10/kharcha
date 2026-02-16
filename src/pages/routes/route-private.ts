import { lazy } from 'react';
import { AppRoute } from './route.types';
const NotFound = lazy(() => import('@pages/route-not-found'));
const DashboardPage = lazy(() => import('@modules/dashboard/dashboard.page'));
const RootRedirect = lazy(() => import('@modules/auth/common/root-redirect'));

// modules
const AddVendorPage = lazy(() => import('@modules/vendors/vendor-add.page'));
const ListVendorPage = lazy(() => import('@modules/vendors/vendor-list.page'));
const AddUnitPage = lazy(() => import('@modules/units/unit-add.page'));
const ListUnitPage = lazy(() => import('@modules/units/unit-list.page'));
const AddItemPage = lazy(() => import('@modules/items/item-add.page'));
const ListItemPage = lazy(() => import('@modules/items/item-list.page'));
const AddExpensePage = lazy(() => import('@modules/expenses/expense-add.page'));
const ListExpensePage = lazy(() => import('@modules/expenses/expense-list.page'));

export const privateRoutes: AppRoute[] = [
  {
    type: 'render',
    path: '/',
    component: RootRedirect,
  },
  {
    type: 'render',
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    type: 'parent',
    path: '/vendors',
    children: [
      {
        type: 'render',
        path: '/add',
        component: AddVendorPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'Add',
          },
        ],
      },
      {
        type: 'render',
        path: '/',
        component: ListVendorPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'List',
          },
        ],
      },
    ],
  },
  {
    type: 'parent',
    path: '/units',
    children: [
      {
        type: 'render',
        path: '/add',
        component: AddUnitPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'Add',
          },
        ],
      },
      {
        type: 'render',
        path: '/',
        component: ListUnitPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'List',
          },
        ],
      },
    ],
  },
  {
    type: 'parent',
    path: '/items',
    children: [
      {
        type: 'render',
        path: '/add',
        component: AddItemPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'Add',
          },
        ],
      },
      {
        type: 'render',
        path: '/',
        component: ListItemPage,
        breadcrumbs: [
          {
            title: 'Item',
          },
          {
            title: 'List',
          },
        ],
      },
    ],
  },
  {
    type: 'parent',
    path: '/expenses',
    children: [
      {
        type: 'render',
        path: '/add',
        component: AddExpensePage,
        breadcrumbs: [
          {
            title: 'Expenses',
          },
          {
            title: 'Add',
          },
        ],
      },
      {
        type: 'render',
        path: '/',
        component: ListExpensePage,
        breadcrumbs: [
          {
            title: 'Expenses',
          },
          {
            title: 'List',
          },
        ],
      },
    ],
  },
  {
    type: 'render',
    path: '*',
    component: NotFound,
    breadcrumbs: [{ title: 'Not Found' }],
  },
];
