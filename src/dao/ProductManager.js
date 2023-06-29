
import fs from 'fs';

class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
        this.id = 0;
    }

    getData = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        }else{
            this.products = [];
        }
    }

    addProduct = async (product) => {
        await this.getData();
        if({title:"", description:"", price:"", thumbnail:"", code:"", stock:""}){
            if(!(this.getProductByCode(product.code))){
                const newProduct = {
                    id: this.id++,
                    title: String(title),
                    description: String(description),
                    price: Number(price),
                    thumbnail: String(thumbnail),
                    code: String(code),
                    stock: Number(stock),
                    category: String(category),
                    status: true
                }
                this.products.push(nexProduct);
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

    getProducts = async() => {
        await this.getData();
        return this.products;
    }

    getProductById = async(id) => {
        await this.getData();
        const product = this.products.find((product) => product.id === id);
        if(!product){
            return ("Producto no encontrado");
        }else{
            return product;
        }
    }

    updateProduct = async(id, newField) => {
        await this.getData();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if(productIndex === - 1){
            return ('Producto inexistente');
        }else{
            const updatedProduct = {
                ...this.products[productIndex],
                ...newField
            }
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        }
    }

    deleteProduct = async(id) => {
        await this.getData();
        const productIndex = this.products.findIndex((product) => product.id === id);
        if(productIndex === - 1){
            return ('Producto inexistente');
        }else{
            this.products.splice(productIndex, 1);
            this.saveProducts();
        }
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
}

export default ProductManager;