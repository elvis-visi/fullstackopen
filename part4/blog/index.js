//index.js imports the app.js file and then starts the application

const app = require('./app') // the actual Express application
const http = require('http') //use http server and client
const config = require('./utils/config') //environment variables
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

