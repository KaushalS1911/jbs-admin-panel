import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));


const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin3 />
    }
  ]
};

export default AuthenticationRoutes;
  