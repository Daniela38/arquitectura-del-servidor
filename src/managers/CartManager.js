import fs from 'fs';

class CartManager{
    constructor(path){
        this.path = path;
        this.cart = [];
        this.id = 0;
    }

    getData = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.cart = JSON.parse(data);
        }else{
            this.cart = [];
        }
    }

    saveCart(){
        fs.promises.writeFile(this.path, JSON.stringify(this.cart));
    }

    addCart = async () => {
        await this.getData();
        const newCart = {
            id: this.id++,
            products: []
        }
        this.cart.push(newCart);
        this.saveCart();
    }

    getCartById = async(id) => {
        await this.getData();
        const cartId = this.cart.find(cart => cart.id === id);
        if(cartId){
            return cartId.products;
        }else{
            return 'Not found';
        }
    }

    addProductCart = async(cartId, productId) => {
        await this.getData();
        let existingProduct = false;
        let quantity = 1;
        const cartProducts = await this.getCartById(cartId);

        cartProducts.map(prod => {
            if(prod.product === productId){
                existingProduct = true;
                return {
                    ...prod,
                    quantity: prod.quantity++
                }
            }
        });

        if(!existingProduct){
            const prod = {
                product: productId,
                quantity: quantity
            }
            cartProducts.push(prod);
        }
        this.saveCart();
    }
}

export default CartManager;