import DbCartManager from "../dao/managers/DBCartManager";
import DbProductManager from "../dao/managers/DBProductManager";

export class CartsService {
    constructor() {
        this.cartManager = new DbCartManager();
        this.productManager = new DbProductManager();
    }

    async createCart(){
        try {
            const newCart = await this.cartManager.createCart();
            return newCart
        } catch(error) {
            throw new Error('Error');
        }
    }

    async getCart(cartId){
        try {
            const cart = await this.cartManager.getCart(cartId);
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
            const cart = await this.cartManager.getCart(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            if(!productId){
                throw new Error('Product ID is required');
            }
            const product = await this.productManager.getCart(productId);
            if(!product){
                throw new Error('Product not found');
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(existingProduct){
                existingProduct.quantity += 1;
            } else{
                cart.products.push({productId: productId, quantity: 1});
            }
            await this.cartManager.updateCartProducts(cartId, cart.products);
            return cart;
        } catch(error) {
            throw new Error('Error');
        }
    }

    async removeFromCart(cartId, productId){
        try{
            const cart = await this.cartManager.getCart(cartId);
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
            await this.cartManager.updateCartProducts(cartId, cart.products);
            return cart 
        } catch(error) {
            throw new Error('Error');
        }
    }

    async updateProductQuantity(cartId, productId, quantity){
        try{
            const cart = await this.cartManager.getCart(cartId);
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
            await this.cartManager.updateCartProducts(cartId, cart.products);
            return cart;
        } catch(error){
            throw new Error('Error');
        }
    } 

    async emptyCart(cartId){
        try{
            const cart = await this.cartManager.getCart(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            cart.products = [];
            await this.cartManager.updateCartProducts(cartId, cart.products);
            return cart
        }catch(error){
            throw new Error('Error');
        }
    }
}