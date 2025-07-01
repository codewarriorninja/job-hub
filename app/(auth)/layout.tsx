import { ReactNode } from 'react'
import { redirectIfAuthenticated } from '@/lib/auth'

const AuthLayout = async ({children}:{children:ReactNode}) => {
  // Redirect authenticated users to dashboard
  await redirectIfAuthenticated()

  return (
    <div>{children}</div>
  )
}

export default AuthLayout