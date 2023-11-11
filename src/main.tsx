import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SchedulingAppointment from './components/SchedulingAppointment.tsx'
import Records from './components/Records.tsx'
import Login from './Login.tsx'
import PatientRecords from './components/PatientRecords.tsx'
import ManagePatient from './components/ManagePatient.tsx'
import Questionnare from './components/Questionnaire.tsx'

import HProvider from './components/provider/HProvider.tsx'
import HProviderRoot from './components/root/HProviderRoot.tsx'
import UserRoot from './components/root/PatientRoot.tsx'
import PatientRoot from './components/root/PatientRoot.tsx'
import Visit from './UserPatient/Visit.tsx'
import PatientLogVisit from './UserPatient/PatientLogVisit.tsx'
import Medication from './components/Medication.tsx'

const logoutUser = async () => {
  localStorage.removeItem('user')
  // return navigate('/login')
}

const redirectIfUser = () => {
  const user = localStorage.getItem('user')
  const userType = localStorage.getItem('type')

  if (user && userType === 'hprovider') {
    return (window.location.href = '/')
  } else {
    return <Login />
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HProvider>
        <HProviderRoot />
      </HProvider>
    ),
    errorElement: <div>Not found</div>,
    children: [
      {
        path: 'patient',
        element: <ManagePatient />,
      },
      {
        path: 'scheduling-appointment',
        element: <SchedulingAppointment />,
      },
      {
        path: 'medication',
        element: <Medication />,
      },
      {
        path: 'records',
        element: <Records />,
      },
      {
        path: 'records/patient/:id',
        element: <PatientRecords />,
      },

      {
        path: 'questions',
        element: <Questionnare />,
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

  {
    path: 'user',
    element: <PatientRoot />,
    children: [
      {
        path: 'visit',
        element: <Visit />,
      },
      {
        path: 'visit/:id',
        element: <PatientLogVisit />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
