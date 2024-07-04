import express from 'express'
import checkToken from '../middleware/authMiddleware.js'
import {
  createUser,
  forgotPassword,
  getProfile,
  logOut,
  login,
  resetPassword,
  updateProfile,
} from '../controllers/userController.js'

const router = express.Router()

// Create user all routes

// create
router.post('/', createUser)

// login
router.post('/login', login)

// logout
router.post('/logout', logOut)

// profile
router.get('/profile', checkToken, getProfile)

// update
router.put('/profile', checkToken, updateProfile)

// forgot password
router.post('/forgotpassword', forgotPassword)

// reset password
router.put('/resetpassword/:token', resetPassword)

export default router
