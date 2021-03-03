const config = require('./config')
const Sequelize = require('sequelize')

const dbQueryString = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`
const sequelize = new Sequelize(dbQueryString)

const dbconnection = (async  () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection has been established successfully.')
        
        const app = require('./app/app')

        app.listen(config.SERVER_PORT, () => {
            console.log(`Server is running at port ${config.SERVER_PORT} `)
        })

      } catch (err) {
        console.error('Unable to connect to the database:', err)
      }
})()  

module.exports = sequelize
