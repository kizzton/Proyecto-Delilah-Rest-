const ProductsService = require('../service/product.service')

class ProductsController {

    static async getAll(req, res) {
        
        try {
        
            const products = await ProductsService.getAllDB()
            res.status(200).json(products)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }

    static async getById(req, res) {

        const id = req.params.id
        
        try {
        
            const product = await ProductsService.getOneById(id)
            res.status(200).json(product)
            console.log(product)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }
 
    static async add(req, res) {

        const { product_name, description, price, product_image } = req.body
        
        try {

            await ProductsService.store({ product_name, description, price, product_image })
            console.log('Product Added to database', req.body)
            res.status(200).json({ message: 'Product created successfully.' })

        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    }

    static async updateRegistry(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {
                const product = await ProductsService.getOneById(id)
                
                if (product[0]) {
                    
                    const { product_name, description, price, product_image } = req.body
                    const modifiedProduct = { product_name, description, price, product_image }
                    await ProductsService.setUpdate(id, modifiedProduct)
                    res.status(200).json({ message: `Product with id ${id} updated successfully.` })
                
                } else {

                    res.status(404).json({ message: 'Not found id' })
                }
        
            } catch (error) {
                console.log(error)
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
                const product = await ProductsService.getOneById(id)
                
                if (product[0]) {
                    
                    await ProductsService.deleteOneById(id)
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

module.exports = ProductsController
