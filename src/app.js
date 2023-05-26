
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products',(req,res)=>{
    const {limit} = req.query;
    const products = productManager.getProducts()
    if(limit > 0 && limit <= 4){
        res.send(products.slice(0, limit));
    }else{
        res.send(products)
    }
});

app.get('/products/:id',(req,res)=>{
    const productId = parseInt(req.params.id);
    const product = productManager.getProductById(productId);
    if(product){
        res.send(product);
    }else{
        return res.status(404).send({ status:'error', error: 'El producto no existe'});
    }
});

app.listen(8080, () => console.log('Listening on 8080'));