const sequelize = require('../../server')

class OrderDetailService {

    static async getAllDB(){
        return await sequelize.query('SELECT * FROM orderdetail', {
            type: sequelize.QueryTypes.SELECT
        });       
    }
    
    static async getOneById(id) {
        return await sequelize.query('SELECT * FROM orderdetail WHERE orders_id = ?' , {
            replacements: [ id ],
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async store(orderdetail) {
        return await sequelize.query('INSERT INTO orderdetail VALUES (null, ?, ?, ?, ?)',
            { replacements: 
                [
                    orderdetail.quantity,
                    orderdetail.subtotal,
                    orderdetail.product_id, 
                    orderdetail.orders_id, 
                ] 
            }) 
    }
}            

module.exports = OrderDetailService
