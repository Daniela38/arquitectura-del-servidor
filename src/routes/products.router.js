import { Router } from "express";

const router = Router();
const products = [];

router.get('/', (req,res)=>{
    res.send({products})
});

router.get('/:pid',(req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find((product) => product.id === productId);
    if(product){
        res.send(product);
    }else{
        return res.status(404).send({ status:'error', error: 'El producto no existe'});
    }
});

router.post('/', (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnail} = req.body;
    const newProduct = {
        id: Math.random(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
    }
    products.push(newProduct);
    res.send({status:"success"});
});

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const newField = req.body;
    const product = products.find((product) => product.id === productId);
    if(product){
        products.productId = newField;
        res.send(product);
    }else{
        return res.status(404).send({ status:'error', error: 'El producto no existe'});
    }
})

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((product) => product.id === productId);
    if(index !== -1){
        const deletedProduct = products.splice(index, 1);
        res.send(deletedProduct);
    }else{
        return res.status(404).send({ status:'error', error: 'El producto no existe'});
    }
});

export default router;