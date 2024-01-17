    const { Router } = require('express')
    const router = Router()
    const ProductManager = require ('../DAO/productManagerDb')
    const productManager = new ProductManager()


router.get('/', async (req, res) => {
    try {
 
     const { limit } = req.query
     

     let products = await productManager.getProducts()

    if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit)
        return res.render('home', { products, style: 'style.css' })
    }
     res.render ('home', { products, style: 'style.css',})
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.get('/:pid', async (req, res) => {
    try {
   
        const { pid } = req.params
   
        const filterById =  await productManager.getProductByID(pid)
        if (!filterById) {
            return res.status(404).json({ error: 'El producto con el id buscado no existe.'})
        } else {
            res.json ({filterById})
        }
    } catch (error) {
        console.error ('Error al obtener los products:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post("/", async (req, res) => {
    try {
      const { code, description, price, stock, thumbnail, title, category } = req.body
      const result = await productManager.addProduct({code,description,price,stock,thumbnail,title,category})
  
      if (result.success) {
        res.status(201).json({ message: "Producto creado correctamente" })
        const productData = {code,description,price,stock,thumbnail,title,category}
        req.app.locals.io.emit("newProduct", { data: productData })
      } else {
        res.status(400).json({ error: result.message })
      }
      return
    } catch (error) {
      console.error("Error al cargar productos:", error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  })

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const { ...product } = req.body
    
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            return res.status(404).json ({error: "Todos los campos son obligatorios. Producto no agregado."})
          }
       
        await productManager.updateProduct({ ...product, id: pid })
        res.json({ message: 'Producto Actualizado correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' })
    }
})

router.delete ('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const result = await productManager.deleteProduct(pid)
        if (result === false) {
            return res.status(404).json({ error: 'El producto con el id buscado no existe.'})
        } else {
            res.json({ message: 'Producto borrado correctamente' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar un producto.' })
    }
})


module.exports = router 

