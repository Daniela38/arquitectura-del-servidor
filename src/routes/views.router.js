import{ Router } from "express";
import DbProductManager from "../dao/DBProductManager.js";

const router = Router();



router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})

router.get('/products', async(req, res) => {
    const productManager = new DbProductManager;
    const products = await productManager.getProducts();
    res.render('home', {title: 'Ecommerce', products: products, user: req.session.user});
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'Ecommerce'});
})

export default router;