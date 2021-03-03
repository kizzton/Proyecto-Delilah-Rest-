const {verify} = require('jsonwebtoken')
const config = require('../../config')
/* const UsersService = require('../service/user.service') */

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  //const checkToken = verify(token, config.JWT.PRIVATE_KEY)
  try {
    const checkToken = verify(token, config.JWT.PRIVATE_KEY)
    console.log(checkToken)
    if(checkToken){
      req.user = checkToken
      console.log(req.user.fullname)
      next()
    }

  } catch (error) {
    console.log(error)
    if(error.name === 'TokenExpiredError'){
      res
      .status(401)
      .send({ error: 'Unauthorized.', message: 'Token expired.' })
    }else{
      res
      .status(401)
      .send({ error: 'Unauthorized.', message: 'Token verification failed.' })
    }
    
  }

}

const verifyRole = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  // 0 => user
  // 1 => admin user 
  try {
    const data = verify(token, config.JWT.PRIVATE_KEY)
  
    if (data.is_admin === 1) {
      next()
  
    } else {
      res
        .status(403)
        .send({ error: 'Unauthorized.', message: 'Access denied.' })
    }
 
  } catch (error) {
    res
      .status(401)
      .send({ error: 'Unauthorized.', message: 'Token verification failed.' })
  }
  
}

module.exports = {verifyToken, verifyRole}
