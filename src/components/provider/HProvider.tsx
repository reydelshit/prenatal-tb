export default function HProvider({ children }: { children: React.ReactNode }) {
  const userType = localStorage.getItem('type')

  if (userType === 'patient') {
    return (window.location.href = '/user')
  } else if (userType === 'admin') {
    return (window.location.href = '/admin')
  } else {
    return (window.location.href = '/login')
  }
  return <div>{children}</div>
}
