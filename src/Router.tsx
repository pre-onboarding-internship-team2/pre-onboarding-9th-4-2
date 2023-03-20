import { createBrowserRouter } from 'react-router-dom';

import Admin from '@pages/Admin';
import AdminNotFound from '@pages/AdminNotFound';
import NotFound from '@pages/NotFound';

import Layout from '@components/Layout';

const router = createBrowserRouter([
  {
    path: '/', // Container for all Routes
    element: <Layout />,
    children: [
      {
        path: 'admin',
        element: <Admin />,
        errorElement: <AdminNotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
