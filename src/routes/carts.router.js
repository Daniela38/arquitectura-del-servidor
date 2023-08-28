import { Router } from "express";
//import CartManager from "../dao/CartManager.js";
import cartController from '../controllers/carts.controller.js';
import passport from 'passport';
import cookieParser from "cookie-parser";
import config from '../config/dotenv.config.js';

const router = Router();
router.use(cookieParser(config.privateKey));

router.post('/', cartController.createCart);
router.get('/:cartId', cartController.getCart);
router.put('/:cartId', cartController.updateCart);
router.post('/:cartId/products/:productId', passport.authenticate("current", { session: false }), cartController.checkUser, cartController.addProductToCart);
router.delete('/:cartId/products/:productId', passport.authenticate("current", { session: false }), cartController.checkUser, cartController.removeProductFromCart);
router.put('/:cartId/products/:productId', passport.authenticate("current", { session: false }), cartController.checkUser, cartController.updateProductQuantity);
router.delete('/:cartId', passport.authenticate("current", { session: false }), cartController.checkUser, cartController.emptyCart);
router.post('/:cartId/checkout', passport.authenticate("current", { session: false }), cartController.checkUser, cartController.checkoutCart);

/*const cartManager = new CartManager('./data/carts.json');

router.post('/', async(req,res) => {
    try{
        const newCart = await cartManager.addCart();
        res.send(newCart);
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.get('/:cid', async(req, res) => {
    try{
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);
        res.send(cart);
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.put('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const products = req.body.products;
        const cart = await cartManager.addProductsToCart(cartId, products)
        res.status(201).send({ status: 1, msg: 'Cart successfully updated', cartProducts: cart.products });
    } catch (error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
});

router.post('/:cid/products/:pid', async(req, res) => {
    try{
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cartProduct = await cartManager.addProductCart(cartId, productId);
        res.send(cartProduct);
    }catch{
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete('/:cid/products/:productId', async (req, res) => {
    try {
        const cid = req.params.cid;
        const productId = req.params.productId;
        const cart = await cartManager.removeFromCart(cid, productId);
        res.status(200).send({ status: 1, msg: 'Product deleted from cart', cart });
    } catch (error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
});

router.put('/:cid/products/:productId', async (req, res) => {
    try{
        const cid = req.params.cid;
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const cart = await cartManager.updateProductQuantity(cid, productId, quantity);
        res.status(201).send({ status: 1, msg: 'Product quantity updated', cart });
    } catch (error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        const emptyCart = await cartManager.emptyCart(cid);
        res.status(201).send({ status: 1, msg: 'Cart empty', cart: emptyCart});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});*/

export default router;