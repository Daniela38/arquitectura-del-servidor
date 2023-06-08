import{ Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

router.get('/', async(req, res) => {
    const productManager = new ProductManager('./data/products.json');
    const products = await productManager.getProducts();
    res.render('home', {title: 'Ecommerce', products: products});
})

router.get('/realtomeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'Ecommerce'});
})

export default router;