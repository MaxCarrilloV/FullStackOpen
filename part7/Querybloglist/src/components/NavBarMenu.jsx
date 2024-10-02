import { useState } from 'react'
import { useLoginDispatch } from '../LoginContext'
import { Menu, MenuItem, Segment, MenuMenu, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
const NavBarMenu = ({ user }) => {
  const [activeItem, setActive] = useState('blogs')
  const navigate = useNavigate()
  const logindispatch = useLoginDispatch()
  const handleItemClick = (e, { name }) => {
    setActive(name)
    if (name === 'blogs') {
      navigate('/')
    } else {
      navigate(`/${name}`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    logindispatch({ type: 'logout' })
  }
  return (
    <Segment
      inverted
      textAlign="center"
      style={{ padding: '1em 0em' }}
      vertical
    >
      <Menu inverted pointing secondary size="large">
        <MenuItem
          as="a"
          name="blogs"
          active={activeItem === 'blogs'}
          onClick={handleItemClick}
        />
        <MenuItem
          as="a"
          name="users"
          active={activeItem === 'users'}
          onClick={handleItemClick}
        />
        <MenuMenu position="right">
          <MenuItem>
              {user.name} logged in
              <Button style={{marginLeft: '1em'}} onClick={() => handleLogout()}>Logout</Button>
          </MenuItem>
        </MenuMenu>
      </Menu>
    </Segment>
  )
}
export default NavBarMenu
