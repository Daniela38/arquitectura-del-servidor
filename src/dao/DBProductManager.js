
import ProductsModel from "./models/products.schema.js";

class DbProductManager{
    constructor(){
        this.productsModel = ProductsModel;
    }

    async getProducts(){
        try{
            const products = await this.productsModel.find()
            return products 
        } catch(error){
            console.log('Error');
        }
    }

    async getProductsById(id){
        try{
            const product = await this.productsModel.findOne({_id:id});
            if(!product){
                throw new Error('Product not found');
            }
            return product
        } catch(error){
            console.log('Error');
        }
    }

    async addProduct(bodyPorduct){
        try{
            const newProduct = await this.productsModel.create(bodyPorduct)
            return newProduct
        } catch(error) {
            console.log('Error');
        }
    }

    async updateProduct(id, updateBodyProduct){
        try{
            const updatedProduct = await this.productsModel.updateOne({_id:id}, updateBodyProduct);
            return updatedProduct
        } catch(error) {
            console.log('Error');
        }
    }

    async deleteProduct(id){
        try{
            const productDeleted = this.productsModel.deleteOne({_id:id})
            return productDeleted
        } catch(error) {
            console.log('Error');
        }
    }
}

export default DbProductManager;

/*router.get('/', async (req, res) => {
    const products = await productsModel.find();
    res.send({products});
})

router.get('/:pid', async (req, res) => {
    const {id} = req.params;
    const product = await productsModel.findOne({_id:id});
    res.send({product});
})

router.delete('/:pid', async (req, res) => {
    const {id} = req.params;
    const result = await productsModel.deleteOne({_id:id});
    res.send({result});
})

router.post('/', async (req, res) => {
    const {name, category, price} = req.body;
    if(!name || !category || !price){
        return res.status(400).send({error: "Datos incompletos"})
    }
    const product = {
        name, ctageory, price
    }
    const result = await productsModel.create(product);
    res.send({result});
})

router.put('/:pid', async(req, res) => {
    const {id} = req.params;
    const {name, category, price} = req.body;
    if(!name || !category || !price){
        return res.status(400).send({error: "Datos incompletos"})
    }
    const newField = {
        name, category, price
    }
    const result = await productsModel.updateOne({_id:id},{$set:newField})
    res.send({result})
})*/