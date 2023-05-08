class ProductManager{
    constructor(){
        this.products = [];
        this.id = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        
        //if(this.products.some((product) => product.code !== code)){

        if(title, description, price, thumbnail, code, stock){
            if(!(this.products.some((product) => product.code === code))){
                const product = {
                    id: this.id++,
                    title, 
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };
                this.products.push(product);
            }
        }else{
            console.log("Error, tiene que ingresar todos los campos")
        }
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((product) => product.id === id);
        if(!product){
            console.log("Not found")
        }
        return product
    }
}

const productManager = new ProductManager();

productManager.addProduct(
    "Producto 1",
    "Descripción del Producto 1",
    100,
    "imgs/img1.png",
    123,
    5
);

productManager.addProduct(
    "Producto 2",
    "Descripción del Producto 2",
    200,
    "imgs/img2.png",
    456,
    10
);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));