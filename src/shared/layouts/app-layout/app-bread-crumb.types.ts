import { subMenuRoutes } from './constants';

export interface Breadcrumb {
  title: string;
  link?: string;
}

export type SubMenuRoute = (typeof subMenuRoutes)[number];
