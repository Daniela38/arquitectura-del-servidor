import ProductManager from "../managers/ProductManager.js";

const updatedProducts = async(io) => {
    const productManager = new ProductManager('./data/products.json');
    const products = await productManager.getProducts();
    io.emit('updatedProducts', products)
};

export default updatedProducts;