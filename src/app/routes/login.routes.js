const { Router } = require('express')
const LoginController = require('../controllers/login.controller')

const router = Router() 

router.post('/', async (req, res) => {
  const { user_name, password } = req.body
  
    if (!user_name || !password){
        return res
            .status(402)
            .send({ error: 'Bad request.', message: 'You should send user and pass' })
    }else{
        try {
            const token = await LoginController.login(user_name, password)
    
            if (token) {
        
                res.status(200).json({ message: 'Logged in successfully.', token })
        
            } else {
                res
                .status(401)
                .send({ error: 'Unauthorized.', message: 'User or pass wrong.' })
            }
        
        } catch (error) {
            res.status(500).json({
                error: 'Something went wrong. Please retry or contact with an admin.',
                message: error
            })
            console.log('error' + error)
        }    
    }
})

module.exports = router  
