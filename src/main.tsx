import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import HealthCareProvider from './components/HealthCareProvider.tsx'
import SchedulingAppointment from './components/SchedulingAppointment.tsx'
import Records from './components/Records.tsx'
import Login from './Login.tsx'

const logoutUser = async () => {
  localStorage.removeItem('user')
  // return navigate('/login')
}

const redirectIfUser = async () => {
  const user = localStorage.getItem('user')
  const userType = localStorage.getItem('type')

  if (user && userType === 'hprovider') {
    return (window.location.href = '/add-patient')
  } else {
    return <Login />
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: 'add-patient',
        element: <HealthCareProvider />,
      },
      {
        path: 'scheduling-appointment',
        element: <SchedulingAppointment />,
      },
      {
        path: 'records',
        element: <Records />,
      },
      {
        path: 'records/:id',
        element: <div>Invoice</div>,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
    loader: redirectIfUser,
  },
  {
    path: 'logout',
    action: logoutUser,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
