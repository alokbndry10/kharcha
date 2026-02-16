import { Breadcrumb } from '@shared/layouts/app-layout/app-bread-crumb.types';
import { JSX } from 'react';

export interface ParentRoute {
  type: 'parent';
  path: string;
  children: AppRoute[];
}
export interface ChildRoute {
  type: 'render';
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  breadcrumbs?: Breadcrumb[];
}

export type AppRoute = ParentRoute | ChildRoute;

export type FlattenedRoutes = Omit<ChildRoute, 'type'>[];
