import { useEffect, useRef, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useRegisterAPIMutation } from '../store/slices/userApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/slices/authSlice.js'

const RegisterPage = () => {
  const [registerAPI, { isLoading }] = useRegisterAPIMutation()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const toastId = useRef(null)

  const registerHandler = async (e) => {
    e.preventDefault()

    // validate

    if (!name || !email || !password || !confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Please fill all fields')
      }
      return
    }
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Passwords do not match confirmPassword ')
      }
      return
    }

    // Register here

    try {
      const response = await registerAPI({ name, email, password }).unwrap()
      dispatch(login({ ...response }))
      toast.success('Registration successful')
      navigate('/profile')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/profile')
  }, [isLoggedIn, navigate])

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Register</h1>
      <Form>
        <Form.Group
          className="my-3"
          controlId="name"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="my-3"
          controlId="email"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
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
            autoComplete="new-password"
          />
        </Form.Group>

        <Form.Group
          className="my-3"
          controlId="confirm password"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          onClick={registerHandler}
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
              Sending...
            </>
          ) : (
            'Register'
          )}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterPage
