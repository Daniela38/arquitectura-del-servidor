import { Router } from "express";
import { updatedProducts } from "../utils/socketUtils.js";
import DbProductManager from "../dao/DBProductManager.js";

const router = Router();
const dbProductManager = new DbProductManager();

router.get('/', async(req,res) => {
    try{
        const {limit = 10, page = 1, sort} = req.query;
        const products = await dbProductManager.getProducts(limit, page, sort);
        res.send(products);
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.get('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const productById = await dbProductManager.getProductsById(id);
        res.send(productById); 
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.post('/', async(req, res) => {
    try{
        const newProductFields = req.body;
        const newProduct = await dbProductManager.addProduct(newProductFields);
        updatedProducts(req.app.get('io'));
        res.send('Producto agregado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});

router.put('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const newField = req.body;
        const updatedProduct = await dbProductManager.updateProduct(id, newField);
        console.log(updatedProduct)
        updatedProducts(req.app.get('io'));
        res.send('Producto actualizado');
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deletedProduct =  await dbProductManager.deleteProduct(id);
        if(deletedProduct){
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