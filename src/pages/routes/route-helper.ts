import { AppRoute, FlattenedRoutes } from './route.types';

/*
 flat all the nested routes
 using child route to prefix with parent route eg: `/parent/child`
 and render the children component to that route
 * */
export function flatNestedRoutes(routes: AppRoute[]) {
  const childrenRoutes: FlattenedRoutes = [];
  populateChildRoutes(routes);

  function populateChildRoutes(routes: AppRoute[], rootPath = '') {
    routes.map((route) => {
      switch (route.type) {
        case 'parent':
          populateChildRoutes(route.children, rootPath + route.path);
          break;
        case 'render':
          childrenRoutes.push({
            path: rootPath + route.path,
            component: route.component,
            breadcrumbs: route.breadcrumbs,
          });
          break;
      }
    });
  }

  return childrenRoutes;
}
