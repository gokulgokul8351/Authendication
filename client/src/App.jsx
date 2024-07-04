import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import RootLayout from './components/RootLayout'
import ProtectedRoutes from './components/ProtectedRoutes'
import UpdateProfilePage from './pages/UpdateProfilePage'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgotpassword', element: <ForgotPassword /> },
      { path: '/resetpassword/:token', element: <ResetPassword /> },
      {
        element: <ProtectedRoutes />,
        children: [{ path: '/profile', element: <ProfilePage /> }],
      },
      {
        element: <ProtectedRoutes />,
        children: [{ path: '/updateprofile', element: <UpdateProfilePage /> }],
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
