import { cartsRepository } from "../repositories/index.js";
import ProductsService from "./products.service.js";
import TicketService from "./tickets.services.js";
import CustomError from "../utils/errorHandler/CustomError.js";

class CartsService {
    constructor() {
        this.cartRepository = cartsRepository;
        this.productService = new ProductsService();
        this.ticketService = new TicketService();
    }

    async createCart(){
        try {
            const newCart = await this.cartRepository.createCart();
            return newCart
        } catch(error) {
            CustomError.createError({
                name: 'createCart Error',
                message: `Failed to add cart: ${error.message}`,
            });
        }
    }

    async getCart(cartId){
        try {
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                CustomError.createError({
                    name: 'getCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });  
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
                CustomError.createError({
                    name: 'checkProductStock Error',
                    message: 'Product not found',
                    recievedParams: { productId }
                });  
            }
            if (product.stock < quantity) {
                CustomError.createError({
                    name: 'checkProductStock Error',
                    message: 'Insufficient stock',
                    recievedParams: { quantity }
                });    
            }
        } catch (error) {
            throw error;
        }
    }

    async addToCart(cartId, productId){
        try{
            let stockControl = 0;
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                CustomError.createError({
                    name: 'addToCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });  
            }
            if(!productId){
                CustomError.createError({
                    name: 'addToCart Error',
                    message: 'Product ID is required'
                });  
            }
            const product = await this.productService.getProductsById(productId);
            if(!product){
                CustomError.createError({
                    name: 'addToCart Error',
                    message: 'Product not found',
                    recievedParams: { productId }
                });   
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(existingProduct){
                existingProduct.quantity += 1;
                stockControl = existingProduct.quantity;
            } else{
                cart.products.push({productId: productId, quantity: 1});
            }
            await this.checkProductStock(productId, stockControl);
            await this.cartRepository.updateCartProducts(cartId, cart.products);
            return cart;
        } catch(error) {
            throw new Error('Error');
        }
    }

    async removeFromCart(cartId, productId){
        try{
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                CustomError.createError({
                    name: 'removeFromCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });    
            }
            if(!productId){
                CustomError.createError({
                    name: 'removeFromCart Error',
                    message: 'Product ID is required'
                });   
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(!existingProduct){
                CustomError.createError({
                    name: 'removeFromCart Error',
                    message: 'Product not found in cart',
                    recievedParams: { productId }
                }); 
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
                CustomError.createError({
                    name: 'updateProductQuantity Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                }); 
            }
            if(!productId){
                CustomError.createError({
                    name: 'updateProductQuantity Error',
                    message: 'Product ID is required'
                });  
            }
            const existingProduct = cart.products.find((product) => product.productId === productId);
            if(!existingProduct){
                CustomError.createError({
                    name: 'updateProductQuantity Error',
                    message: 'Product not found in cart',
                    recievedParams: { productId }
                }); 
            }
            if(!quantity){
                CustomError.createError({
                    name: 'updateProductQuantity Error',
                    message: 'Quantity is required'
                });   
            }
            if(quantity <= 0){
                CustomError.createError({
                    name: 'updateProductQuantity Error',
                    message: 'Quantity cannot be zero or negative',
                    recievedParams: { quantity }
                });   
            }
            existingProduct.quantity = quantity;
            await this.cartRepository.updateCart(cartId, cart.products);
            return cart;
        } catch(error){
            throw new Error('Error');
        }
    } 

    async emptyCart(cartId){
        try{
            const cart = await this.cartRepository.getCart(cartId);
            if(!cart){
                CustomError.createError({
                    name: 'emptyCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });    
            }
            cart.products = [];
            await this.cartRepository.updateCart(cartId, cart.products);
            return cart
        }catch(error){
            CustomError.createError({
                name: 'emptyCart Error',
                message: `Failed to empty cart: ${error.message}`
            }); 
        }
    }

    addProductToCart = async (cartId, products) => {
        try {
            const cart = await this.cartRepository.getCart(cartId);
            if (!cart) {
                CustomError.createError({
                    name: 'addProductsToCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });
            }
            if (!products || products.length === 0) {
                CustomError.createError({
                    name: 'addProductsToCart Error',
                    message: 'Invalid product list'
                });
            }
            const existingProducts = cart.products.map((product) => product.productId);
            const productsToAdd = [];
            const productsToUpdate = [];
            for (const productData of products) {
                const { productId, quantity } = productData;
                if (!productId) {
                    CustomError.createError({
                        name: 'addProductsToCart Error',
                        message: 'Product ID is required'
                    });  
                }
                if (!quantity || quantity <= 0) {
                    CustomError.createError({
                        name: 'addProductsToCart Error',
                        message: 'Valid quantity is required'
                    });  
                }
                const product = await this.productService.getProductsById(productId);
                if (!product) {
                    CustomError.createError({
                        name: 'addProductsToCart Error',
                        message: 'Product not found',
                        recievedParams: { productId }
                    });   
                }
                if (existingProducts.includes(productId)) {
                    const existingProduct = cart.products.find((product) => product.productId === productId);
                    existingProduct.quantity += quantity;
                    productsToUpdate.push(existingProduct);
                } else {
                    productsToAdd.push({ product: product, quantity: quantity });
                }
            }
            cart.products.push(...productsToAdd);
            await this.cartRepository.updateCart(cartId, cart.products);
            return cart
        } catch(error) {
            CustomError.createError({
                name: 'addProductsToCart Error',
                message: `Failed to add products to cart: ${error.message}`
            }); 
        }
    }

    checkoutCart = async (cartId, purchaser) => {
        try {
            const cart = await this.cartRepository.getCart(cartId);
            console.log(cartId)
            if (!cart) {
                CustomError.createError({
                    name: 'checkoutCart Error',
                    message: 'Cart not found',
                    recievedParams: { cartId }
                });   
            }
            if (cart.products.length === 0) {
                CustomError.createError({
                    name: 'checkoutCart Error',
                    message: 'Cart is empty'
                }); 
            }
            const products = cart.products;
            const productsPurchased = [];
            const productsNotPurchased = [];
            
            for (const product of products) {
                try {
                    await this.productService.updateProductStock(product.productId, -product.quantity);
                    productsPurchased.push(product);
                } catch (error) {
                    productsNotPurchased.push(product);
                }
            }
            
            if (productsPurchased.length === 0) {
                CustomError.createError({
                    name: 'checkoutCart Error',
                    message: 'No products were purchased'
                });  
            }

            await this.emptyCart(cartId);
            if (productsNotPurchased.length > 0) {
                const newCartProducts = productsNotPurchased.map((product) => {
                    return { productId: product.productId, quantity: product.quantity }
                });
                await this.addProductsToCart(cartId, newCartProducts);
            }
            const remainingCart = await this.getCart(cartId);
            const totalAmount = productsPurchased.reduce((total, product) => total + (product.price * product.quantity), 0);
            const newTicket = await this.ticketService.createTicket({ amount: totalAmount, purchaser: purchaser });
            if (!newTicket) {
                CustomError.createError({
                    name: 'checkoutCart Error',
                    message: 'Failed to create ticket'
                });
            }
            const purchaseCartResult = {
                ticket: newTicket,
                productsPurchased: productsPurchased,
                remainingCart: remainingCart
            }
            return purchaseCartResult
        } catch (error) {
            CustomError.createError({
                name: 'checkoutCart Error',
                message: `Failed to purchase cart: ${error.message}`
            }); 
        }
    }
}

export default CartsService;