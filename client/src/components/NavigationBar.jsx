import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice.js'
import { useLogoutAPIMutation } from '../store/slices/userApiSlice.js'
import { toast } from 'react-toastify'

const NavigationBar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutAPI] = useLogoutAPIMutation()

  const logoutHandler = async () => {
    try {
      await logoutAPI().unwrap()
      dispatch(logout())
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        data-bs-them="dark"
      >
        <Container>
          <Link
            to="/"
            className="navbar-brand "
          >
            Logo
          </Link>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <NavDropdown
                  // bg="dark"
                  title={userData.name}
                  id="username"
                >
                  <Nav.Link
                    className=" bg-black "
                    as={Link}
                    to="/profile"
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    className=" bg-black "
                    as={Link}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active bg-primary ' : 'nav-link  '
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active bg-primary' : 'nav-link  '
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
