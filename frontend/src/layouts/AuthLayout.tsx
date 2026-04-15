import * as React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <>
      <div>AuthLayout</div>
      <Outlet />
    </>
  )
}

export default AuthLayout