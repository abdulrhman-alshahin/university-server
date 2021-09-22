/* eslint-disable no-undef */
require('dotenv').config({ path: '../config.env' })
const nodemailer = require('nodemailer')

const sendEmail = (to, email) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASSWORD,
      },
   })
   const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: email.title,
      html: `
      <body style='margin:0; padding:0'>
         <div style='width:100%;text-align:center;font-family:Sans-Serif;background-color:#212121;color:#fbfbfb;padding:4rem'>
            <h1 style='font-weight: 800'>
               ${email.title}
            </h1>
            <h4>
               ${email.blog}
            </h4>
         </div>
      </body>`,
   }
   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error)
      } else {
         console.log('Email sent: ' + info.response)
      }
   })
}
module.exports = sendEmail
