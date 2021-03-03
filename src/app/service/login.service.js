const sequelize = require('../../server')

class LoginService {

    static async login (user_name, password) {
      return await sequelize.query(
        `SELECT u.id, u.fullname, u.email, u.phone, u.adress, u.is_admin
        FROM user u
        WHERE u.user_name = ?
        AND u.password = ?`,
        {
            replacements: [
                user_name, 
                password
            ],
            type: sequelize.QueryTypes.SELECT
        })
    }

    static async addToken(token, id){
        return await sequelize.query('UPDATE user SET token = ? WHERE id = ?', {
            replacements: [
                token,
                id
            ]
        })  
    }
}

module.exports = LoginService
