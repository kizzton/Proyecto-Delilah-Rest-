const sequelize = require('../../server')

class ProductsService {

    static async getAllDB() {
        return await sequelize.query('SELECT * FROM product', {
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async getOneById(id) {
        return await sequelize.query('SELECT * FROM product WHERE id = ?' , {
            replacements: [ id ],
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async store(product) {
        return await sequelize.query('INSERT INTO product VALUES (null, ?, ?, ?, ?)',
            { 
                replacements: [ 
                    product.product_name, 
                    product.description, 
                    product.price, 
                    product.product_image 
                ] 
        })
    }

    static async setUpdate(id, product) {
        return await sequelize.query(
            `UPDATE product SET 
            product_name = ?, description = ?, price = ?, product_image = ? 
            WHERE id = ?`,
            {
                replacements: [
                    product.product_name, 
                    product.description, 
                    product.price, 
                    product.product_image,
                    id
                ]
            })
        }

    static async deleteOneById(id) {
        return await sequelize.query('DELETE FROM product WHERE id = ?', {
            replacements: [id]
        })
    }
}

module.exports = ProductsService
