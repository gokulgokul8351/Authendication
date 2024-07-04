import { useState, useRef, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useUpdateProfileAPIMutation } from '../store/slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/authSlice'

const UpdateProfilePage = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)
  const [updateProfileAPI, { isLoading }] = useUpdateProfileAPIMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const toastId = useRef(null)

  const updateHandler = async (e) => {
    e.preventDefault()

    // validate

    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Passwords do not match confirmPassword ')
      }
      return
    }

    // Register here

    try {
      const response = await updateProfileAPI({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap()
      dispatch(login({ ...response }))
      toast.success('Update profile successfully')
      setConfirmPassword('')
      setPassword('')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  useEffect(() => {
    setName(userData.name)
    setEmail(userData.email)
  }, [userData.name, userData.email])
  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Update</h1>
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
          onClick={updateHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Updating...
            </>
          ) : (
            'Update'
          )}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default UpdateProfilePage
