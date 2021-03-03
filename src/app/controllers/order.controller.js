const ProductsService = require('../service/product.service')
const OrdersService = require('../service/order.service')
const OrderDetailService = require('../service/orderdetail.service')
const { filterParams } = require('../middlewares/functions')

class OrdersController{

    static async getAll(req, res){

        try {
        
            const orders = await OrdersService.getAllDB()
            res.status(200).json(orders)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }

    static async getById(req, res) {

        const id = req.params.id
        
        try {
        
            const order = await OrdersService.getOneById(id)
            res.status(200).json(order)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }   
    }

    static async add(req, res) {
        
        const userId = req.user.id
        let montoTotal = null            

        try {

            const { products } = req.body
            
            for (let data in products){
                let product = await ProductsService.getOneById(products[data].product_id)
                let subtotal = product[0].price * products[data].quantity
                montoTotal += subtotal
                //console.log(product)
            }
           
            const { date_time = new Date(), total = montoTotal, state = "nuevo", user_id = userId, paymentmethod } = req.body
           
            let order = await OrdersService.store({ date_time, total, state, user_id, paymentmethod })
            
            for(let p in products){
                let product = await ProductsService.getOneById(products[p].product_id)
                let subTotal = product[0].price * products[p].quantity
                console.log(product)
                 
                const { quantity = products[p].quantity, subtotal = subTotal, product_id = products[p].product_id , orders_id = order[0] } = req.body
                let orderdetail = await OrderDetailService.store({ quantity, subtotal, product_id, orders_id }) 
                console.log(orderdetail)
            }

            res.status(201).json({ msg: "Order created successfully", id: order[0] })

        } catch (error) {
            
            console.log(error)
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    }

    static async updateRegistry(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {
                const order = await OrdersService.getOneById(id)

                if (order[0]) {
                    const { state } = req.body
                    
                    const params = filterParams({ state })
                    const modifiedOrder = { ...order, ...params }
                    await OrdersService.setUpdate(id, modifiedOrder)
                    res.status(200).json({ message: `Order with id ${id} updated successfully.` })
                    /* const { total = montoTotal, dateTime= new Date(), paymentMethod, state, user_id } = req.body
                    const modifiedProduct = { productName, description, price, productImage, subitem_id }
                    await ProductService.setUpdate(id, modifiedProduct)
                    res.status(200).json({ message: `Product with id ${id} updated successfully.` }) */
                
                } else {
                 
                    res.status(404).json({ message: 'Not found id' })
                }
        
            } catch (error) {

                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }

        }else{

            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }    
    }

    static async deleteById(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {            
                const order = await OrdersService.getOneById(id)
                
                if (order[0]) {
                    
                    await OrdersService.deleteOneById(id)
                    res.status(200).json({ message: `Order with id ${id} was disabled correctly` });
                
                } else {
                
                    res.status(404).json({message: 'Not found id' })
                }

            } catch(error) {
                
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }
            
        }else{

            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }   
    }
}

module.exports = OrdersController
