const sequelize = require('../../server')

class UsersService {

    static async getAllDB() {
        return await sequelize.query('SELECT * FROM user', {
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async getOneById(id) {
        return await sequelize.query('SELECT * FROM user WHERE id = ?' , {
            replacements: [ id ],
            type: sequelize.QueryTypes.SELECT
        });
    }
    
    static async store(user) {
        return await sequelize.query(
            `INSERT INTO user (user_name, fullname, email, phone, adress, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            { 
                replacements: [ 
                    user.user_name, 
                    user.fullname, 
                    user.email, 
                    user.phone,
                    user.adress,
                    user.password,
                    user.is_admin
                ] 
        })
    }

    static async setUpdate(id, user) {
        return await sequelize.query(
            `UPDATE user SET 
            fullname = ?, email = ?, phone = ?, adress = ?   
            WHERE id = ?`,
            {
                replacements: [
                    user.fullname, 
                    user.email, 
                    user.phone,
                    user.adress,
                    id
                ]
            })
        }

    static async deleteOneById(id) {
        return await sequelize.query('DELETE FROM user WHERE id = ?', {
            replacements: [id]
        })
    }
}

module.exports = UsersService
