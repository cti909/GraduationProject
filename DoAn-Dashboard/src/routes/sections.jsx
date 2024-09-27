import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const PlantPage = lazy(() => import('src/pages/plant'));
export const LandPage = lazy(() => import('src/pages/land'));
// export const RegisterPage = lazy(() => import('src/pages/register'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// export const ProfilePage = lazy(() => import('src/pages/profile'));

// ----------------------------------------------------------------------

export default function Router() {
  const location = useLocation();

  const isLogin = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
    return false;
  };

  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="user" />,
    },
    {
      path: '/',
      element: isLogin() ? (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      ),
      children: [
        { path: 'user', element: <UserPage />, index: true },
        { path: 'plant', element: <PlantPage /> },
        { path: 'land', element: <LandPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
