import CartsModel from "./models/carts.schema.js";
import ProductsModel from "./models/products.schema.js";

class DbCartManager {
    constructor() {
        this.cartModel = CartsModel;
        this.productModel = ProductsModel;
    }

    async createCart(){
        try {
            const newCart = await this.cartModel.create({ products: [] });
            return newCart
        } catch(error) {
            throw new Error('Error');
        }
    }

    async getCart(cartId){
        try {
            const cart = await this.cartModel.findOne(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw new Error('Error');
        }
    }

    async addToCart(cartId, productId){
        try{
            const cart = await this.cartModel.findOne(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            if(!productId){
                throw new Error('Product ID is required');
            }
            const product = await this.productModel.findOne(productId);
            if(!product){
                throw new Error('Product not found');
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(existingProduct){
                existingProduct.quantity += 1;
            } else{
                cart.products.push({productId: productId, quantity: 1});
            }
            await cart.save();
            return cart;
        } catch(error) {
            throw new Error('Error');
        }
    }

    async removeFromCart(cartId, productId){
        try{
            const cart = await this.cartModel.findOne(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            if(!productId){
                throw new Error('Product ID is required');
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(!existingProduct){
                throw new Error('Product not found in cart');
            }
            existingProduct.quantity -= 1;
            if(existingProduct.quantity === 0){
                cart.products = cart.products.filter((product) => product.productId !== productId);
            }
            await cart.save();
            return cart 
        } catch(error) {
            throw new Error('Error');
        }
    }

    async updateProductQuantity(cartId, productId, quantity){
        try{
            const cart = await this.CartsModel.findById(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            if(!productId){
                throw new Error('Product ID is required');
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(!existingProduct){
                throw new Error('Product not found in cart');
            }
            if(!quantity){
                throw new Error('Quantity is required');
            }
            if(quantity <= 0){
                throw new Error('Quantity cannot be zero or negative');
            }
            existingProduct.quantity = quantity;
            await cart.save();
            return cart;
        } catch(error){
            throw new Error('Error');
        }
    } 

    async deleteCart(cartId) {
        try {
            const cart = await this.cartModel.findByIdAndDelete(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
        } catch(error) {
            throw new Error('Error');
        }
    }
}

export default DbCartManager;