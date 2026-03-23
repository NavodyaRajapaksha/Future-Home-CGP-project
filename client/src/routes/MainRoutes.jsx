import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AboutUs from 'pages/extra-pages/AboutUs';
import Privacy from 'pages/extra-pages/Privacy';
import Terms from 'pages/extra-pages/Terms';
import ProtectedRoute from 'components/ProtectedRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));


// property
const Properties = Loadable(lazy(() => import('pages/properties')));

// project
const Projects = Loadable(lazy(() => import('pages/projects')));

// tasks
const Tasks = Loadable(lazy(() => import('pages/tasks')));

// materials
const Materials = Loadable(lazy(() => import('pages/materials')));

// sustainability
const Sustainability = Loadable(lazy(() => import('pages/sustainability')));

// ar
const ARViewer = Loadable(lazy(() => import('pages/ar')));
const ARResult = Loadable(lazy(() => import('pages/ar/result')));

// inquiries
const Inquiries = Loadable(lazy(() => import('pages/inquiries')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },


    {
  path: 'properties',
  element: (
    <ProtectedRoute roles={['admin', 'contractor', 'client']}>
      <Properties />
    </ProtectedRoute>
  )
},
    {
  path: 'projects',
  element: (
    <ProtectedRoute roles={['admin', 'contractor']}>
      <Projects />
    </ProtectedRoute>
  )
},
    {
  path: 'tasks',
  element: (
    <ProtectedRoute roles={['admin', 'contractor']}>
      <Tasks />
    </ProtectedRoute>
  )
},
    {
  path: 'materials',
  element: (
    <ProtectedRoute roles={['admin']}>
      <Materials />
    </ProtectedRoute>
  )
},
    {
  path: '/sustainability',
  element: (
    <ProtectedRoute roles={['admin','contractor','client']}>
      <Sustainability />
    </ProtectedRoute>
  )
},
    {
  path: '/ar',
  element: (
    <ProtectedRoute roles={['admin','contractor','client']}>
      <ARViewer />
    </ProtectedRoute>
  )
},
    {
    path: 'ar/result',
    element:(
      <ProtectedRoute roles={['admin','contractor','client']}>
     <ARResult />
     </ProtectedRoute>
    )
    },
    {
  path: '/inquiries',
  element: (
    <ProtectedRoute roles={['admin','client']}>
      <Inquiries />
    </ProtectedRoute>
  )
},
    {
    path: 'about',
    element: <AboutUs />
    },
    {
    path: 'privacy',
    element: <Privacy />
    },
    
    {
    path: 'terms',
    element: <Terms />
    }
  ]
};

export default MainRoutes;

