const LoginService = require('../service/login.service')
/* const UserService = require('../service/user.service') */
const { sign } = require('jsonwebtoken')
const config = require('../../config')

class LoginController {
    
    static async login(user, pass) {
        const findUser = await LoginService.login(user, pass)
        console.log(findUser)
        if (findUser.length) {
            const token = sign(findUser[0], config.JWT.PRIVATE_KEY, {
                expiresIn: config.JWT.EXPIRES_TIME
            })
            
            await LoginService.addToken(token, findUser[0].id)
            return token

        } else {
            return null
        }       
    }
}

module.exports = LoginController
