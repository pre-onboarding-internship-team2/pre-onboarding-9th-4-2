import React from 'react';
import { useRoutes } from 'react-router-dom';

import Main from 'pages/Main';
import Layout from 'components/Layout';

export default function Router() {
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Main />,
        },
      ],
    },
  ]);
  return element;
}
