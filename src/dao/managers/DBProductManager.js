
import ProductsModel from "../models/products.model.js";

class DbProductManager{
    constructor(){
        this.productsModel = ProductsModel;
    }

    async getProducts(limit, page, sort, category, available){
        try{
            let query = this.productsModel.find();
            if(category){
                query = query.category;
            }
            if(available){
                query = query.available;
            }
            if(sort){
                if(sort === 'asc'){
                    query = query.sort({ price: 1 });
                }else if(sort === 'desc'){
                    query = query.sort({ price: -1 });
                }else{
                    throw new Error('asc or desc expected');
                }
            }
            const products = await this.productsModel.paginate(query, {
                    limit: limit || 10,
                    page: page || 1,
                });
            return products 
        } catch(error){
            throw new Error('Error');
        }
    }

    async getProductsById(id){
        try{
            const product = await this.productsModel.findById(id);
            return product
        } catch(error){
            throw new Error('Error');
        }
    }

    async addProduct(bodyPorduct){
        try{
            const newProduct = await this.productsModel.create(bodyPorduct)
            return newProduct
        } catch(error) {
            throw new Error('Error');
        }
    }

    async updateProduct(id, updateBodyProduct){
        try{
            const updatedProduct = await this.productsModel.updateOne({_id:id}, updateBodyProduct);
            console.log(updateBodyProduct)
            return updatedProduct
        } catch(error) {
            throw new Error('Error');
        }
    }

    async deleteProduct(id){
        try{
            const productDeleted = this.productsModel.deleteOne({_id:id})
            return productDeleted
        } catch(error) {
            throw new Error('Error');
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