// express
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './lip/db.js'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import router from './routes/userRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.MAIN_PORT ? process.env.MAIN_PORT : 5000
const userRouter = router // user route

// cores policy
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

// json middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookie-parser middleware
app.use(cookieParser())

// env config
dotenv.config()

// database
connectDB()

// route
app.get('/', (req, res) => {
  res.send('welcome world')
})

// middleware routes
app.use('/api/user', userRouter)

// Error middleware
app.use(notFound)
app.use(errorHandler)

// Listen the port
app.listen(PORT, () => {
  console.log(`Server run at http://localhost:${PORT} `)
})
