import User from '../models/userModel.js' // user model
import generateToken from '../utils/generateCookies.js'
import asyncHandler from 'express-async-handler'
import { sendPasswordResetLink } from '../utils/resetPassword.js'
import jwt from 'jsonwebtoken'
const gmailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+(?<!\.)@gmail\.com$/

// create
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body

  //   validate
  if (!name || !email || !password) {
    const err = new Error('All fields are required' || 400)
    return next(err)
  }

  if (password.length < 8) {
    res.status(400)
    const err = new Error('Password must be at least 8 characters long' || 400)
    return next(err)
  }

  if (!gmailRegex.test(email)) {
    const err = new Error('Invalid email address' || 400)
    return next(err)
  }

  try {
    // const userExists = await User.findOne({ email })
    // if (userExists) {
    //   const err = new Error('User already exists 1' || 400)
    //   return next(err)
    // }

    // has logic

    const user = await User.create({ name, email, password })

    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400)
      const err = new Error('User already exists 2' || 400)
      return next(err)
    }
    res.status(500).json({ message: error.message } || 'Internal server error')
  }
}

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password' || 4000)
  }
})

// logout
const logOut = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'logged out...' })
})

// profile
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})

// update
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findById(req.user._id)

  // validate

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if (!gmailRegex.test(email)) {
      res.status(400)
      throw new Error('Invalid email address')
    }
    if (password) {
      if (password.length < 8) {
        res.status(400)
        throw new Error('Password must be at least 8 characters long')
      }
      user.password = password
    }
    const updateUser = await user.save()
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      password: updateUser.password,
    })
  } else {
    res.status(400)
    throw new Error('User not found' || 400)
  }
})

// forgot password
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    const err = new Error('All fields are required' || 400)
    res.status(400)
    return next(err)
  }

  // check user
  const user = await User.findOne({ email })
  if (!user) {
    const err = new Error('Invalid email address' || 400)
    res.status(404)
    return next(err)
  }

  // user found generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 300,
  })
  const date = new Date()
  const newMinutes = date.getMinutes() + 5
  date.setMinutes(newMinutes)
  user.reset_password_token = token
  user.reset_password_expiration = date

  // save data
  await user.save()

  // send email

  const verificationEmailResponse = await sendPasswordResetLink(
    email,
    token,
    user.name
  )

  if (verificationEmailResponse.error) {
    const err = new Error(
      'Failed to send password reset link, please try later'
    )
    res.status(500)
    return next(err)
  }

  res.status(200).json({
    message: 'Password reset link sent, please check your email',
  })
})

// reset password
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params
  const { password } = req.body

  if (!token) {
    const err = new Error('Invalid valid token' || 500)
    res.statusCode = 500
    return next(err)
  }
  if (!password) {
    const err = new Error('bad request, password is missing')
    res.statusCode = 400
    return next(err)
  }

  const user = await User.findOne({
    reset_password_token: token,
    reset_password_expiration: { $gt: Date.now() },
  })

  // user not found
  if (!user) {
    const err = new Error(
      'Password reset link is invalid or expired, please try again'
    )
    res.statusCode = 404
    return next(err)
  }

  // user found
  user.password = password
  user.reset_password_token = undefined
  user.reset_password_expiration = undefined
  // user save data
  await user.save()
  res.status(200).json({
    message: 'Password reset successfully, please login to continue',
  })
})

export {
  createUser,
  login,
  logOut,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
}
