import{ Router } from "express";
import DbProductManager from "../dao/managers/DBProductManager.js";
import CartManager from "../dao/managers/DBCartManager.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/', publicAccess, (req, res) => {
    res.render('login');
})

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
})

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
})

router.get('/resetpassword', publicAccess, (req, res) => {
    res.render('resetPassword');
})

router.get('/profile', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})

router.get('/products', privateAccess, async(req, res) => {
    try{
        const { limit = 10, page = 1, sort } = req.query;
        const productManager = new DbProductManager;
        const products = await productManager.getProducts(limit, page, sort);
        res.render('home', {title: 'Ecommerce', products: products, user: req.session.user});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get('/realtimeproducts', privateAccess, (req, res) => {
    res.render('realTimeProducts', {title: 'Ecommerce'});
})

router.get('/carts/:cid', privateAccess, async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartManager = new CartManager();
        const cart = await cartManager.getCartById(cid);
        res.render('cart', { cart: cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default router;