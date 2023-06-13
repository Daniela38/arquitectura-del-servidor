import { Router } from "express";
import updatedProducts from "../utils/socketUtils.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async(req,res) => {
    try{
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        const limitProduct = limit >= 0 ? limit : products.length;
        res.send(products.slice(o, limitProduct));
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.get('/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        res.send(product); 
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.post('/', async(req, res) => {
    try{
        const {
            title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail
        } = req.body;
        await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
        updatedProducts(req.app.get('io'));
        res.send('Producto agregado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.put('/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.pid);
        const newField = req.body;
        await productManager.updateProduct(productId, newField);
        updatedProducts(req.app.get('io'));
        res.send('Producto actualizado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete('/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.id);
        const deletedProduct =  await productManager.deleteProduct(productId);
        if(!deletedProduct){
            updatedProducts(req.app.get('io'));
            res.send('Producto eliminado');
        }else{
            res.send('El producto no existe');
        }
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

export default router;