import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();
const cartManager = new CartManager('./data/carts.json');

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

router.post('/:cid/product/:pid', async(req, res) => {
    try{
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cartProduct = await cartManager.addProductCart(cartId, productId);
        res.send(cartProduct);
    }catch{
        res.status(500).send('Error al obtener los datos');
    }
})

export default router;