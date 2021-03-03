const sequelize = require('../../server')

class OrdersService {
    
    static async getAllDB(){
        return await sequelize.query('SELECT * FROM orders', {
            type: sequelize.QueryTypes.SELECT
        });       
    }
    
    static async getOneById(id) {
        return await sequelize.query('SELECT * FROM orders WHERE id = ?' , {
            replacements: [ id ],
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async store(orders) {
        
       return await sequelize.query('INSERT INTO orders VALUES (null, ?, ?, ?, ?, ?)',
            { replacements: 
                [
                    orders.date_time, 
                    orders.total, 
                    orders.state, 
                    orders.user_id, 
                    orders.paymentmethod
                ] 
            })             
    }

    static async setUpdate(id, orders) {
        return await sequelize.query(
            `UPDATE orders SET 
            state = ?   
            WHERE id = ?`,
            {
                replacements: [
                    orders.state,
                    id
                ]
            })
        }

    static async deleteOneById(id) {
        return await sequelize.query('DELETE FROM orders WHERE id = ?', {
            replacements: [id]
        })
    }
}

module.exports = OrdersService
