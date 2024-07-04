import ejs from 'ejs'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotEnv from 'dotenv'

dotEnv.config()

const currentFilePath = import.meta.url
const currentDirectory = dirname(fileURLToPath(currentFilePath))

// mail configuration
const mail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
})

async function sendPasswordResetLink(email, token, name) {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../templete/reset_pwd.ejs`,
      { token, name }
    )

    const mailOptions = {
      from: ` Gokul Todo team ${process.env.NODEMAILER_USER} `,
      to: email,
      subject: 'password reset link',
      html: renderedContent,
    }

    const verificationInfo = await mail.sendMail(mailOptions)
    return verificationInfo
  } catch (error) {
    return { error }
  }
}

export { sendPasswordResetLink }
