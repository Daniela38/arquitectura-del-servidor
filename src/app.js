
import express from 'express';
import {ProductManager} from './ProductManager';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products',(req,res)=>{
    const products = ProductManager.getProducts()
    const limit = req.query;
    if(limit > 0 && limit <= products.length){
        res.send(products.slice(0, limit));
    }else{
        res.send(products)
    }
});

app.get('/products/:id',(req,res)=>{
    const productId = parseInt(req.params.id);
    const product = ProductManager.getProductById(productId);
    if(product){
        res.send(product);
    }else{
        return res.status(404).send({ status:'error', error: 'Producto no encontrado'});
    }
});

app.listen(8080, () => console.log('Listening on 8080'));