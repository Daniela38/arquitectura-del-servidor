import { ProductsService } from "../services/products.service.js";

const productsService = new ProductsService();

export const getProducts = async(req, res) => {
    try{
        const {limit = 10, page = 1, sort} = req.query;
        const products = await productsService.getProducts(limit, page, sort)
        res.send(products);
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
}

export const getProductsById = async(req, res) => {
    try{
        const id = req.params.id;
        const productById = await productsService.getProductsById(id);
        res.send(productById); 
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
}

export const addProduct = async(req, res) => {
    try{
        const newProductFields = req.body;
        const newProduct = await productsService.addProduct(newProductFields);
        //updatedProducts(req.app.get('io'));
        res.send({status: 1, msg: 'Added product', product: newProduct});
    }catch(error){
        res.status(500).send({status: 0, msg: error.message});
    }
}

export const updateProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const newField = req.body;
        const updatedProduct = await productsService.updateProduct(id, newField);
        //updatedProducts(req.app.get('io'));
        res.send({status: 1, msg: 'Updated product', product: updatedProduct});
    }catch(error){
        res.status(404).send({status: 0, msg: error.message});
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const deletedProduct =  await productsService.deleteProduct(id);
        if(deletedProduct){
            //updatedProducts(req.app.get('io'));
            res.send({status: 1, msg: 'Deleted product'});
        }else{
            res.send('The product does not exist');
        }
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
}