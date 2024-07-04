import { Form, Button, Spinner } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useResetPasswordAPIMutation } from '../store/slices/userApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  const [resetPasswordAPI, { isLoading }] = useResetPasswordAPIMutation()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      toast.error('All fields are required')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Password & confirmpassword should match')
      return
    }

    // success

    try {
      const response = await resetPasswordAPI({ password, token }).unwrap()
      setPassword('')
      setConfirmPassword('')
      toast.success('Updated Successfully')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 3000)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <FormContainer>
      <h1 className="text-center fe-bold mb-3 text-primary">Reset Password</h1>
      <Form>
        <Form.Group
          className="my-3"
          controlId="Password"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="my-3"
          controlId="confirm-password"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={submitHandler}
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
            'Submit'
          )}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPassword
