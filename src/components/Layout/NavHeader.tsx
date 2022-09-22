import React from 'react'

import type { AuthState } from '../../hooks/useAuth'

type UserInfoVM = Partial<AuthState>
const NavHeader: React.FC<{ userInfo: UserInfoVM }> = ({ userInfo }) => {
  return (
    <div>
      <p>NavHeader</p>
      <p>{userInfo.firstName}</p>
    </div>
  )
}

export default NavHeader
