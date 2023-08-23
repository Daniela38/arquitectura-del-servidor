import CartsRepository from "../repositories/carts.repository.js";
import ProductsService from "./products.service.js";
import TicketService from "./tickets.services.js";

class CartsService {
    constructor() {
        this.cartRepository = new CartsRepository();
        this.productService = new ProductsService();
        this.ticketService = new TicketService();
    }

    async createCart(){
        try {
            const newCart = await this.cartRepository.createCart();
            return newCart
        } catch(error) {
            throw new Error('Error');
        }
    }

    async getCart(cartId){
        try {
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw new Error('Error');
        }
    }

    checkProductStock = async (productId, quantity) => {
        try {
            const product = await this.productService.getProductsById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.stock < quantity) {
                throw new Error('Insufficient stock');
            }
        } catch (error) {
            throw error;
        }
    }

    async addToCart(cartId, productId){
        try{
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            if(!productId){
                throw new Error('Product ID is required');
            }
            const product = await this.productService.getCart(productId);
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
            const cart = await this.cartRepository.getCart(cartId);
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
            await this.cartRepository.updateCartProducts(cartId, cart.products);
            return cart 
        } catch(error) {
            throw new Error('Error');
        }
    }

    async updateProductQuantity(cartId, productId, quantity){
        try{
            const cart = await this.cartRepository.getCart(cartId);
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
            await this.cartRepository.updateCartProducts(cartId, cart.products);
            return cart;
        } catch(error){
            throw new Error('Error');
        }
    } 

    async emptyCart(cartId){
        try{
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                throw new Error('Cart not found');
            }
            cart.products = [];
            await this.cartRepository.updateCartProducts(cartId, cart.products);
            return cart
        }catch(error){
            throw new Error('Error');
        }
    }

    

    checkoutCart = async (cartId, purchaser) => {
        try {
            const cart = await this.cartRepository.getCart(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            if (cart.products.length === 0) {
                throw new Error('Cart is empty')
            }
            const products = cart.products;
            const productsPurchased = [];
            const productsNotPurchased = [];
            
            for (const product of products) {
                try {
                    await this.productService.updateProductStock(product.product._id.toString(), -product.quantity);
                    productsPurchased.push(product);
                } catch (error) {
                    productsNotPurchased.push(product);
                }
            }
            
            if (productsPurchased.length === 0) {
                throw new Error('No products were purchased');
            }

            await this.emptyCart(cartId);
            if (productsNotPurchased.length > 0) {
                const newCartProducts = productsNotPurchased.map((product) => {
                    return { productId: product.product._id.toString(), quantity: product.quantity }
                });
                await this.addProductsToCart(cartId, newCartProducts);
            }
            const remainingCart = await this.getCart(cartId);
            const totalAmount = productsPurchased.reduce((total, product) => total + (product.product.price * product.quantity), 0);
            const newTicket = await this.ticketService.createTicket({ amount: totalAmount, purchaser: purchaser });
            if (!newTicket) {
                throw new Error('Failed to create ticket');
            }
            const purchaseCartResult = {
                ticket: newTicket,
                productsPurchased: productsPurchased,
                remainingCart: remainingCart
            }
            return purchaseCartResult
        } catch (error) {
            throw new Error('Failed to purchase cart: cart');
        }
    }
}

export default CartsService;