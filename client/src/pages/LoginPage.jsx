import { useState, useRef, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginAPIMutation } from '../store/slices/userApiSlice.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)

  const [loginAPI, { isLoading }] = useLoginAPIMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toastId = useRef(null)

  const loginHandler = async (e) => {
    e.preventDefault()

    // validate
    if (!email || !password) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Email and password are requires')
      }
      return
    }

    // login

    try {
      const response = await loginAPI({ email, password }).unwrap()
      dispatch(login({ ...response }))
      toast.success(`Successfully login!`)
      navigate('/profile')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn, navigate])

  return (
    <FormContainer>
      <h1 className=" text-center fw-bold mb-3 text-primary ">Login</h1>
      <Form>
        <Form.Group
          className="my-3"
          controlId="email"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group
          className="my-3"
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={loginHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>
      <Link
        className="mt-4 link-underline link-underline-opacity-0 "
        to="/forgotpassword"
      >
        Forgot Password
      </Link>
    </FormContainer>
  )
}

export default LoginPage
