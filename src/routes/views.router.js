import{ Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})

router.get('/', async(req, res) => {
    const productManager = new ProductManager;
    const products = await productManager.getProducts();
    res.render('home', {title: 'Ecommerce', products: products});
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'Ecommerce'});
})

export default router;