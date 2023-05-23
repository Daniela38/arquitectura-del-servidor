
import {ProductManager} from './ProductManager'

const productManager = new ProductManager('./products.json');

console.log(productManager.getProducts());

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

productManager.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 250,
    thumbnail: "Sin imagen",
    code: "def456",
    stock: 20
});

productManager.addProduct({
    title: "producto prueba 3",
    description: "Este es un producto prueba 3",
    price: 350,
    thumbnail: "Sin imagen",
    code: "ghi789",
    stock: 20
});

console.log(productManager.getProducts());

productManager.updateProduct(1, {
    title: "producto actualizado",
    description: "Esta es una actualización de prueba",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 30
})

console.log(productManager.getProducts());

productManager.deleteProduct(2);

productManager.addProduct({
    title: "producto prueba 4",
    description: "Este es un producto prueba 4",
    price: 450,
    thumbnail: "Sin imagen",
    code: "jkl789",
    stock: 20
});

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(5));