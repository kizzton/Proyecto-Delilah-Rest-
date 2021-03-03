const { Router } = require('express')
const OrderDetailController = require('../controllers/orderdetail.controller')

const router = Router()

router  
    .get('/', OrderDetailController.getAll)

    .get('/:order_id', OrderDetailController.getById)

module.exports = router
