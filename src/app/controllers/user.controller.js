const UsersService = require('../service/user.service')

class UsersController {

    static async getAll(req, res) {
        
        try {
        
            const users = await UsersService.getAllDB()
            res.status(200).json(users)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }

    static async getById(req, res) {

        const id = req.params.id
        //const userId = req.user.id
        //const role = req.user.is_admin

        try {
        
            const user = await UsersService.getOneById(id)
            
            console.log(user)
            res.status(200).json(user)
            /* if(user[0].id === userId || role !== 0){
                res.status(200).json(user)
                console.log(user)
            }else{
                res.status(403).json({ message: 'Access denied.'})
            } */   

        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }   
    }
 
    static async add(req, res) {

        const { user_name, fullname, email, phone, adress, password, is_admin = 0 } = req.body
        
        try {

            await UsersService.store({ user_name, fullname, email, phone, adress, password, is_admin})
            console.log('User Added to database', req.body);
            res.status(200).json({ message: 'User created successfully.' })
        
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    }

    static async updateRegistry(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {
                const user = await UsersService.getOneById(id)

                if (user[0]) {
             
/*                     const { fullname, email, phone, adress } = req.body
            
                    const params = filterParams({ fullname, email, phone, adress })
                    const modifiedUser = { ...user, ...params }
                    await UsersService.setUpdate(id, modifiedUser)
                    res.status(200).json({ message: `User with id ${id} updated successfully.` }) */
                    const { fullname, email, phone, adress } = req.body
                    const modifiedUser = { fullname, email, phone, adress }
                    await UsersService.setUpdate(id, modifiedUser)
                    res.status(200).json({ message: `User with id ${id} updated successfully.` })
                
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
                const user = await UsersService.getOneById(id)
                
                if (user[0]) {
                    
                    await UsersService.deleteOneById(id)
                    res.status(200).json({ message: `Product with id ${id} was disabled correctly` });
                
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

module.exports = UsersController
