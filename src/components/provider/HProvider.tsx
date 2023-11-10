export default function HProvider({ children }: { children: React.ReactNode }) {
  const userType = localStorage.getItem('type')

  if (userType === 'patient') {
    return (window.location.href = '/user')
  }

  if (userType === 'admin') {
    return (window.location.href = '/admin')
  }

  if (userType === 'hprovider') {
    return <div>{children}</div>
  }

  if (!userType) {
    return (window.location.href = '/login')
  }
}
