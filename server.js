
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
// we will require the app after configuring the env variables
const app = require('./app')


const Port = process.env.PORT || 5000

app.listen(Port, () => {
   // eslint-disable-next-line no-console
   console.log(`server is running on port ${Port}`)
})
