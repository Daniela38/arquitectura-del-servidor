import { Router } from "express";

const router = Router();
const carts = [];

router.post('/', (req,res)=>{
    const cart = {
        id: Math.random(),
        products: [],
    };
    carts.push(cart);
    res.send({status:"success"});
});

router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);
    if(cart){
        res.send(cart.products);
    }else{
        return res.status(404).send({ status:'error', error: 'El producto no existe'});
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);
    const cart = carts.find((cart) => cart.is === cartId);
    const product = cart.products.find((product) => products.id === productId);
    if(product){
        product.quantity += 1;
    }else{
        const newProduct = {
            product: productId,
            quantity: 1
        };
        cart.products.push(newProduct);
    }
})

export default router;