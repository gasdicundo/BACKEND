const { Router } = require('express')
const router = Router()
const ProductManager = require('../DAO/productManagerDb')
const productManager = new ProductManager('./archivo/products.json')

router.get('/', async (req, res) => {
    try {

     const { limit } = req.query
     
     const products = await productManager.getProducts()

     if (!(isNaN(limit) || limit <= 0)) {    
         productsFilter = products.slice (0, limit)
         return res.json ({ productsFilter })
     }
     res.render ('realTimeProducts', { 
        products,
        style: 'style.css',
     })
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router