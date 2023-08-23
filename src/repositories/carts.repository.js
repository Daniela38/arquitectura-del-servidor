export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createCart = async () => {
        const newCart = await this.dao.createCart();
        return newCart
    }

    getCart = async (cartId) => {
        const cart = await this.dao.getCart(cartId);
        return cart
    }

    updateCart = async (cartId, newCartProducts) => {
        const cart = await this.dao.updateCart(cartId, newCartProducts);
        return cart
    }
}