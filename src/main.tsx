import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import HealthCareProvider from './components/HealthCareProvider.tsx'
import SchedulingAppointment from './components/SchedulingAppointment.tsx'
import Records from './components/Records.tsx'

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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
