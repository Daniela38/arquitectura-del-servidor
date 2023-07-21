import{ Router } from "express";
import DbProductManager from "../dao/DBProductManager.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
})

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
})

router.get('/profile', privateAccess, (req, res) => {
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