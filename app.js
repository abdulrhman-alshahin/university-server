const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const AppError = require('./util/appError')
const errorHandler = require('./util/errorHandler')
const studentRoutes = require('./routers/student.routes')
const examRoutes = require('./routers/exam.routes')
const examDatesRoutes = require('./routers/examDates.routes')
const subjectRoutes = require('./routers/subject.routes')
const mongoose = require('mongoose')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const newsRouter = require('./routers/news.routes')
const City = require('./models/city.model')
const Faculty = require('./models/faculty.model')
const University = require('./models/university.model')
const theme = require('./theme')

const app = express()
app.use(cors())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

const run = async () => {
   const db = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   AdminBro.registerAdapter(AdminBroMongoose)
   const adminBro = new AdminBro({
      databases: [db],
      assets: { globalsFromCDN: false },
      rootPath: '/admin',
      branding: {
         theme,
         companyName: 'Alamati',
         logo: false,
         softwareBrothers: false,
      },
      dashboard: {
         component: AdminBro.bundle('./Components/Main.jsx'),
      } /* 
      pages: {
         test: {
            label: 'hello admin',
            handler: async (req, res, ctx) => {
               return { text: 'hi' }
            },

            component: AdminBro.bundle('./components/Main'),
         },
      }, */,
   })
   const router = AdminBroExpress.buildRouter(adminBro)
   app.use(adminBro.options.rootPath, router)
   app.use('/api/student', studentRoutes)
   app.use('/api/edate', examDatesRoutes)
   app.use('/api/exam', examRoutes)
   app.use('/api/subject', subjectRoutes)
   app.use('/api/news', newsRouter)
   app.all('*', (req, res, next) => {
      const error = new AppError(
         `can't find ${req.originalUrl} on this server!`,
         404
      )
      next(error)
   })
   app.use(errorHandler)
}
run()

module.exports = app
