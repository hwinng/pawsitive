import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useMatch, Link as RouterLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

import * as colors from '../../constants/colors'
import { useAsync } from '../../hooks/useAsync'
import type { AuthState } from '../../hooks/useAuth'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { getAvatarLetter } from '../../utils/getAvatarText'
import CustomAvatar from '../Common/Avatar'
import Button from '../Common/Button'
import { Logo } from '../Common/Logo'

const NavHeaderWrapper = styled.nav<{ isMobile?: boolean }>`
  ${(props) => {
    if (!props.isMobile) {
      return css`
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d3d3d3;
        align-items: center;
        padding-inline: 1rem;
      `
    }
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-block: 0.5rem;
      padding-inline: 1rem;
      border: 0.5px solid #d3d3d3;
      border-radius: 5px;
    `
  }}
`

const IconWrapper = styled.div`
  height: 36px;
  width: 36px;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  &:hover {
    background-color: rgba(60, 64, 67, 0.08);
    outline: none;
  }
  &:active {
    background-color: rgba(60, 64, 67, 0.08);
  }
  &:not(:active) {
    background-color: none;
  }
`

const MenuMobileWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AvatarWrapper = styled.div<{ isMobile?: boolean }>`
  ${(props) => {
    if (!props.isMobile) {
      return css`
        display: flex;
        gap: 0.5rem;
        align-items: center;
      `
    }
  }}
`

const Title = styled.div`
  text-align: center;
  vertical-align: center;
  display: flex;
  align-items: center;
  font-size: 1.5em;
`

const LinkWrapper = styled(RouterLink)<{ active: string }>`
  display: block;
  width: 100%;
  height: 100%;
  color: ${colors.text};
  border-radius: 2px;
  font-size: 1.5rem;
  &:hover,
  :focus {
    color: ${colors.orange};
    text-decoration: none;
    opacity: 0.7;
  }

  ${(props) => {
    if (props.active) {
      return css`
        border-bottom: 3px solid ${colors.orange};
        &:hover,
        :focus {
          color: ${colors.orange};
          text-decoration: none;
        },
      `
    }
    return css`
      border-bottom: unset;
    `
  }}
`

const MenuTablet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-left: 2rem;
`

const NavItem = styled.li`
  margin: auto;
`

function NavLink(props: any) {
  const match = useMatch(props.to)
  return <LinkWrapper active={match && 'true'} {...props} />
}

function Nav() {
  return (
    <NavList>
      <NavItem>
        <NavLink to="/pets">Pet</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/owners">Owner</NavLink>
      </NavItem>
    </NavList>
  )
}

type UserInfoVM = Partial<AuthState>
const NavHeader: React.FC<{
  title?: string
  userInfo: UserInfoVM
  logout: () => Promise<void>
}> = ({ userInfo, title = 'Pawsitive', logout }) => {
  const isTablet = useMediaQuery('(min-width: 768px)')
  const { run } = useAsync()

  async function handleLogout() {
    await run(logout())
  }

  if (isTablet) {
    return (
      <NavHeaderWrapper>
        <MenuTablet>
          <Logo
            width="54"
            height="54"
            viewBox="0 0 360 300"
            style={{ display: 'block' }}
          />
          <Title>{title}</Title>
          <Nav />
        </MenuTablet>

        <div>
          <AvatarWrapper>
            <CustomAvatar text={getAvatarLetter(userInfo.firstName)} />
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </AvatarWrapper>
        </div>
      </NavHeaderWrapper>
    )
  }
  return (
    <NavHeaderWrapper isMobile>
      <MenuMobileWrapper>
        <IconWrapper>
          <AiOutlineMenu />
        </IconWrapper>
        <Logo
          width="54"
          height="54"
          viewBox="0 0 360 300"
          style={{ display: 'block' }}
        />
        <Title>{title}</Title>
      </MenuMobileWrapper>
      <AvatarWrapper isMobile>
        <CustomAvatar text={getAvatarLetter(userInfo.firstName)} />
      </AvatarWrapper>
    </NavHeaderWrapper>
  )
}

export default NavHeader
