import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@components/error-boundary';
import { AppLayout } from '@shared/layouts/app-layout/app-layout.view';
import { PublicLayout } from '@shared/layouts/public-layout/public-layout.view';
import { publicRoutes } from './routes/route-public';
import { privateRoutes } from './routes/route-private';
import { flatNestedRoutes } from './routes/route-helper';
import PrivateProviders from '@/setup/private.providers';
import { useGetUserProfile } from '@shared/hooks/use-get-user';
import { Spin } from 'antd';

export function Routers() {
  const { isLoggedIn, userLoading } = useGetUserProfile();

  if (userLoading)
    return (
      <div className="h-dvh flex items-center justify-center">
        <Spin spinning />
      </div>
    );

  if (!isLoggedIn) {
    return getPublicRoutes();
  }

  return getPrivateRoutes();
}

function getPublicRoutes() {
  const flatPublicRoutes = flatNestedRoutes(publicRoutes);
  return (
    <PublicLayout>
      <ErrorBoundary>
        <Routes>
          {flatPublicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense
                  fallback={
                    <div className="h-dvh flex items-center justify-center">
                      <Spin spinning />
                    </div>
                  }
                >
                  <route.component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </ErrorBoundary>
    </PublicLayout>
  );
}

function getPrivateRoutes() {
  const flatPrivateRoutes = flatNestedRoutes(privateRoutes);
  return (
    <PrivateProviders>
      <Routes>
        {flatPrivateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppLayout breadcrumbs={route.breadcrumbs}>
                <Suspense
                  fallback={
                    <div className="h-dvh flex items-center justify-center">
                      <Spin spinning />
                    </div>
                  }
                >
                  <route.component />
                </Suspense>
              </AppLayout>
            }
          />
        ))}
      </Routes>
    </PrivateProviders>
  );
}
