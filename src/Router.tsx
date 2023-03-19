import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

const router = createBrowserRouter([
  {
    path: '/', // Container for all Routes
    element: <Layout />,
    children: [
      {
        path: 'admin',
        element: <Admin />,
        errorElement: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
