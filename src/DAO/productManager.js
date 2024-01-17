const fs = require ('fs').promises

class ProductManager {

    constructor(filePath) {
        this.products = []
        this.id = 1
        this.path = filePath
      
        this.loadProducts()
    }

    async loadProducts() {
        try {
            const contenidoJson = await fs.readFile(this.path, 'utf8')
            if (contenidoJson.trim()) {
                this.products = JSON.parse(contenidoJson)
             
                this.id = Math.max(...this.products.map(product => product.id), 0) + 1
            }
        } catch (error) {
            console.error('No se puede leer el archivo, error:', error.message)
        }
    }

    async addProduct(product) {
      try {
          const { title, description, price, thumbnail, code, stock, status, category } = product
  
          if (!title || !description || !price || !code || !stock || !category) {
            console.error ("Todos los campos son obligatorios. Producto no agregado.")
            console.log (title)
            return { success: false, message: "Todos los campos son obligatorios. Producto no agregado." }
          }

          const codeExist = this.products.find(product => product.code === code)
          if (codeExist) {
            console.error (`El producto con code: ${code} ya existe. Por favor, seleccione otro.`)
            return { success: false, message: `El producto con code: ${code} ya existe. Por favor, seleccione otro.` }
          }

          const newProduct = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: status ?? true,
            category
          }

     
          this.products.push(newProduct)
          await this.updateFile()

          return { success: true }

      } catch (error) {
        console.error('Error al cargar productos:', error.message)
        return { success: false, message: 'Error interno al procesar la solicitud.' }
      }
    }

    async updateFile() {
      try {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf8')
        console.log("Archivo actualizado correctamente")
      } catch (error) {
        console.error('Error al cargar productos:', error.message)
        return { success: false, message: 'Error interno al procesar la solicitud.' }
      }
    }

    async updateProduct(productUpdated) {
      try {
        const product = this.products.find((p) => p.id === productUpdated.id)

        if (!product) {
          console.error("Producto no encontrado con ID:", productUpdated.id)
          return
        } 

 
       product.title = productUpdated.title
       product.description = productUpdated.description
       product.price = productUpdated.price
       product.thumbnail = productUpdated.thumbnail
       product.code = productUpdated.code
       product.stock = productUpdated.stock
       product.status = productUpdated.status
       product.category = productUpdated.category

       await this.updateFile()
  
      } catch (error) {
        console.error("Error al actualizar el producto:", error.message)
      }
    }  

    async getProducts() {
      try {
        const contenidoJson = await fs.readFile(this.path, 'utf8')
        const objetoRecuperado = JSON.parse(contenidoJson)
        if (!contenidoJson.trim()) {
          return [] 
        }
        return objetoRecuperado 
      } catch (error) {
        console.error('No se obtener el archivo, error:', error.message)
      }
    }

    async getProductByID (id) {
      try {
        const contenidoJson = await fs.readFile (this.path, 'utf8')
        const objetoRecuperado =  JSON.parse(contenidoJson)
        const findID = objetoRecuperado.find (product => product.id === Number(id))
        if (findID) return findID
      } catch (error) {
          console.log ('Not Found')
        } 
    }

    async deleteProduct(id) {
      try {
        const idExist = this.products.find(product => product.id === (id))
        if (idExist) {     
    
        this.products = this.products.filter((product) => product.id !== id)

 
        await this.updateFile()
  
        console.log("Producto borrado correctamente")}

      } catch (error) {
        console.error("Error al borrar el producto:", error.message)
      }
    }
  }

module.exports = ProductManager


