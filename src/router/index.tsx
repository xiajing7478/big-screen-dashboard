import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Orders from '@/pages/Orders'
import Packages from '@/pages/Packages'
import Plans from '@/pages/Plans'
import Person from '@/pages/Person'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'packages',
            element: <Packages />,
          },
          {
            path: 'plans',
            element: <Plans />,
          },
          {
            path: 'person',
            element: <Person />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])

export default router
