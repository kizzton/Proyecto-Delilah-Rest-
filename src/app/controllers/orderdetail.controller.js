const OrderDetailService = require('../service/orderdetail.service')

class OrderDetailController{

    static async getAll(req, res){
        
        try {
        
            const orders = await OrderDetailService.getAllDB()
            res.status(200).json(orders)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }

    static async getById(req, res) {

        const order_id = req.params.order_id
        
        try {
        
            const order = await OrderDetailService.getOneById(order_id)
            res.status(200).json(order)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }   
    }
}

module.exports = OrderDetailController
