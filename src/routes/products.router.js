import { Router } from "express";
import { updatedProducts } from "../utils/socketUtils.js";
import DbProductManager from "../dao/DBProductManager.js";

const router = Router();
const dbProductManager = new DbProductManager();

router.get('/', async(req,res) => {
    try{
        const limit = parseInt(req.query.limit);
        const products = await dbProductManager.getProducts();
        const limitProduct = limit >= 0 ? limit : products.length;
        res.send(products.slice(0, limitProduct));
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.get('/:pid', async(req, res) => {
    try{
        const {productId} = req.params;
        const product = await dbProductManager.getProductById(productId);
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
        await dbProductManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
        updatedProducts(req.app.get('io'));
        res.send('Producto agregado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.put('/:pid', async(req, res) => {
    try{
        const {id} = req.params;
        const newField = req.body;
        await dbProductManager.updateProduct(id, newField);
        updatedProducts(req.app.get('io'));
        res.send('Producto actualizado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete('/:pid', async(req, res) => {
    try{
        const productId = parseInt(req.params.id);
        const deletedProduct =  await dbProductManager.deleteProduct(productId);
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