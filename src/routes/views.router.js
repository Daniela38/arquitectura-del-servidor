import{ Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

router.get('/', async(req, res) => {
    const productManager = new ProductManager;
    const products = await productManager.getProducts();
    res.render('home', {title: 'Ecommerce', products: products});
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'Ecommerce'});
})

export default router;