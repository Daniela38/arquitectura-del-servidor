
const fs = require('fs');
//import fs from 'fs';

export default class ProductManager{
    constructor(path){
        this.products = [];
        this.id = 1;
        this.path = path;
        this.getData();
    }

    async getData() {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        } catch (e){
            throw new Error('Hubo un error en la lectura');
        } 
    }

    addProduct(product){
        if({title:"", description:"", price:"", thumbnail:"", code:"", stock:""}){
            if(!(this.getProductByCode(product.code))){
                const id = this.id++;
                this.products.push({id, ...product});
                this.saveProducts();
            }else{
                return ("Código repetido");
            }
        }else{
            return ("Error, tiene que ingresar todos los campos");
        }
    }

    getProductByCode(code){
        return this.products.find((product) => product.code === code);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((product) => product.id === id);
        if(!product){
            return ("Not found");
        }
        return product
    }

    updateProduct(id, newProduct){
        const productIndex = this.products.findIndex((product) => product.id === id);
        if(productIndex === - 1){
            return ('Producto inexistente');
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
