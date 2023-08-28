import { Router } from "express";
import productController from '../controllers/products.controller.js';
import passport from 'passport';
import cookieParser from "cookie-parser";
import config from '../config/dotenv.config.js';

const router = Router();
router.use(cookieParser(config.privateKey));
//const dbProductManager = new DbProductManager();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.post('/', passport.authenticate("current", { session: false }), productController.checkAdmin, productController.addProduct);
router.put('/:id', passport.authenticate("current", { session: false }), productController.checkAdmin, productController.updateProduct);
router.delete('/:id', passport.authenticate("current", { session: false }), productController.checkAdmin, productController.deleteProduct);

/*router.get('/', async(req,res) => {
    try{
        const {limit = 10, page = 1, sort} = req.query;
        const products = await dbProductManager.getProducts(limit, page, sort);
        res.send(products);
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});*/

/*router.get('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const productById = await dbProductManager.getProductsById(id);
        res.send(productById); 
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});*/

/*router.post('/', async(req, res) => {
    try{
        const newProductFields = req.body;
        const newProduct = await dbProductManager.addProduct(newProductFields);
        updatedProducts(req.app.get('io'));
        res.send({status: 1, msg: 'Added product', product: newProduct});
    }catch(error){
        res.status(500).send({status: 0, msg: error.message});
    }
});*/

/*router.put('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const newField = req.body;
        const updatedProduct = await dbProductManager.updateProduct(id, newField);
        console.log(updatedProduct)
        updatedProducts(req.app.get('io'));
        res.send({status: 1, msg: 'Updated product', product: updatedProduct});
    }catch(error){
        res.status(404).send({status: 0, msg: error.message});
    }
});*/

/*router.delete('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deletedProduct =  await dbProductManager.deleteProduct(id);
        if(deletedProduct){
            updatedProducts(req.app.get('io'));
            res.send({status: 1, msg: 'Deleted product'});
        }else{
            res.send('The product does not exist');
        }
    }catch(error){
        res.status(500).send('Error al obtener los datos');
    }
});*/

export default router;