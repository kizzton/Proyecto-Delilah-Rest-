const { Router } = require('express')
const OrdersController = require('../controllers/order.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')
const router = Router()

router
    .get('/', verifyToken, verifyRole, OrdersController.getAll)
    
    .post('/addOrder', verifyToken, OrdersController.add)

    .get('/:id', verifyToken, verifyRole, OrdersController.getById)

    .put('/edit/:id', verifyToken, verifyRole, OrdersController.updateRegistry)

    .delete('/delete/:id', verifyToken, verifyRole, OrdersController.deleteById)

module.exports = router
