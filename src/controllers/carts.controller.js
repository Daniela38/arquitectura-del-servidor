import CartsService from '../services/carts.service.js';

const cartsService = new CartsService();

export const createCart = async(req, res) => {
    try {
        const newCart = await cartsService.createCart();
        res.status(201).send({ status: 1, msg: 'Cart successfully added', cartId: newCart._id });
    } catch(error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
}

export const getCart = async(req, res) => {
    try {
        const cartId =req.params.cartId;
        const cart = await cartsService.getCart(cartId);
        res.json({ status: 1, cart });
    } catch(error) {
        res.status(500).json({ status: 0, error: error.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const cartId =req.params.cartId;
        const products = req.body.products;
        const cart = await cartsService.addToCart(cartId, products);
        res.status(201).send({ status: 1, msg: 'Cart successfully updated', cartId: newCart._id });
    } catch(error) {
        res.status(500).send({ status: 0, msg: error.message });
    }
}