import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenTicated = localStorage.getItem('user')
  const userType = localStorage.getItem('type')

  if (!isAuthenTicated) {
    return <Navigate to="/login" />
  }

  return <div>{children}</div>
}
