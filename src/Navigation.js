import React, { Suspense, Fragment, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
// import { BASE_URL } from './config/constant';
import AppointmentBook from './views/apt/aptTable/AptTable';
import OtpVerification from './views/auth/signin/OtpVerification';
//import Otp from './views/auth/otp/Otp';
import Signin1 from './views/auth/signin/SignIn1';

export const Navigation = () => (

  <Router >
    <Routes>
      <Route exact path="/" element={<Signin1 />} />
      <Route exact path="/appointmentbook" element={<AppointmentBook />} />
      <Route exact path="/otp" element={<Signin1 />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>


);

// const routes = [
//   {
//     exact: true,
//     path: '/auth/signin-1',
//     component: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     exact: true,
//     path: '/auth/signup-1',
//     component: lazy(() => import('./views/auth/signup/SignUp1'))
//   },
//   {
//     path: '*',
//     layout: AdminLayout,
//     routes: [
//       {
//         exact: true,
//         path: '/app/dashboard/default',
//         component: lazy(() => import('./views/dashboard/DashDefault'))
//       },
//       {
//         exact: true,
//         path: '/basic/button',
//         component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
//       },
//       {
//         exact: true,
//         path: '/basic/badges',
//         component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
//       },
//       {
//         exact: true,
//         path: '/basic/breadcrumb',
//         component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
//       },
//       {
//         exact: true,
//         path: '/basic/pagination',
//         component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
//       },
//       {
//         exact: true,
//         path: '/basic/collapse',
//         component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
//       },
//       {
//         exact: true,
//         path: '/basic/tabs-pills',
//         component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
//       },
//       {
//         exact: true,
//         path: '/basic/typography',
//         component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
//       },
//       {
//         exact: true,
//         path: '/forms/form-basic',
//         component: lazy(() => import('./views/forms/FormsElements'))
//       },
//       {
//         exact: true,
//         path: '/tables/bootstrap',
//         component: lazy(() => import('./views/tables/BootstrapTable'))
//       },
//       {
//         exact: true,
//         path: '/charts/nvd3',
//         component: lazy(() => import('./views/charts/nvd3-chart'))
//       },
//       {
//         exact: true,
//         path: '/maps/google-map',
//         component: lazy(() => import('./views/maps/GoogleMaps'))
//       },
//       {
//         exact: true,
//         path: '/sample-page',
//         component: lazy(() => import('./views/extra/SamplePage'))
//       },
//       {
//         path: '*',
//         exact: true,
//         component: () => <Redirect to={BASE_URL} />
//       }
//     ]
//   }
// ];

export default Navigation;
