import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const checkToken = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.token

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decodedToken.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, Invalid token!')
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized !')
  }
})

export default checkToken
