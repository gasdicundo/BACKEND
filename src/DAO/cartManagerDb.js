const Carts = require('./models/carts.model')
const ProductManager = require ('../DAO/productManagerDb')
const productManager = new ProductManager()
const mongoose = require('mongoose')


class CartManager {

    async addCart() {
        try {
            const newCart = {
              products : []
            }

            await Carts.create(newCart)
            return { success: true, message: 'Carrito creado correctamente' }
   
        } catch (error) {
            console.error('Error al crear el carrito:', error.message)
            return { success: false, message: 'Error interno al procesar la solicitud.' }
        }
      }

    async getCartByID (id) {
        try {
          const findCart = await Carts.findOne({ _id: id})
          if (findCart) return findCart
        } catch (error) {
            console.log ('Error al obtener los productos del carrito:', error.message)
          } 
      }

    
async addProductInCart(cid, pid) {
    try {
   
        const cart = await Carts.findById(cid);

        if (cart) {
         
            const product = await productManager.getProductByID(pid)

            if (product) {
              
                const productIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString());

                if (productIndex !== -1) {
                   
                    cart.products[productIndex].quantity++;
                } else {
             
                    cart.products.push({ product: new mongoose.Types.ObjectId(pid), quantity: 1 });
                }

            
                await cart.save();
                console.log('Producto agregado al carrito con éxito');
                return { success: true, message: 'Producto agregado correctamente al carrito' }
            } else {
                console.log('El producto no existe en la base de datos');
                return { success: false, message: 'El producto no existe en la lista general de productos.' }
            }
        } else {
            console.log('El carrito no existe en la base de datos');
            return { success: false, message: 'carrito no encontrado.' }
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return { success: false, message: 'internal server error' }
    }
  }

}

module.exports = CartManager


