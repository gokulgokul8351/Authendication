import { Form, Button, Spinner } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useForgotPasswordAPIMutation } from '../store/slices/userApiSlice.js'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [forgotPasswordAPI, { isLoading }] = useForgotPasswordAPIMutation()
  const [email, setEmail] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Email is required')
      return
    }

    try {
      const response = await forgotPasswordAPI({ email })
      toast.success(response.data.message)
      setEmail('')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  return (
    <FormContainer>
      <h1 className="text-center fe-bold mb-3 text-primary">Forgot Password</h1>
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

export default ForgotPassword
