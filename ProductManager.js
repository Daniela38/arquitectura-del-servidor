
const fs = require('fs');

class ProductManager{
    constructor(){
        this.products = [];
        this.id = 1;
        this.path = './products.json';
    }

    addProduct(product){
        if({title:"", description:"", price:"", thumbnail:"", code:"", stock:""}){
            if(!(this.getProductByCode(product.code))){
                const id = this.products.length + 1;
                this.products.push({id, ...product});
                this.saveProducts();
            }
        }else{
            console.log("Error, tiene que ingresar todos los campos")
        }
    }

    getProductByCode(code){
        return this.products.find((product) => product.code === code);
    }

    getProducts(){
        const operaciones = async () => {
            try{
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
            } catch (e){
                throw new Error('Hubo un error en la lectura');
            }      
        }
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((product) => product.id === id);
        if(!product){
            console.log("Not found")
        }
        return product
    }

    updateProduct(id, newProduct){
        const productIndex = this.products.findIndex((product) => product.id === id);
        if(productIndex === - 1){
            console.log('Producto inexistente');
        }
        const product = this.products[productIndex];
        const newField = {...product, ...newProduct};
        this.products[productIndex] = newField;
        this.saveProducts();
    }

    deleteProduct(id){
        const productIndex = this.products.findIndex((product) => product.id === id);
        this.products.splice(productIndex, 1);
        this.saveProducts();
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
}

const productManager = new ProductManager();

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

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));