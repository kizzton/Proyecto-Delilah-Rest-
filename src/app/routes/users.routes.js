const { Router } = require('express')
const UsersController = require('../controllers/user.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')
const router = Router()

router
    .get('/', verifyToken, verifyRole, UsersController.getAll)

    .post('/signin', UsersController.add)

    .get('/:id', verifyToken, UsersController.getById)

    .put('/edit/:id', verifyToken, verifyRole, UsersController.updateRegistry)
    
    .delete('/delete/:id', verifyToken, verifyRole, UsersController.deleteById)

module.exports = router
