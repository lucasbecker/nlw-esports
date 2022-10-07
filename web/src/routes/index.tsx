import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Game from '../pages/Game';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:gameId',
        element: <Game />,
      },
      {
        path: '*',
        element: <Navigate to='/' />,
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}