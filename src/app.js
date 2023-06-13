
import express from 'express';
import __dirname from './utils/utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => console.log('Listening on 8080'));

const io = new Server(httpServer);

app.set('io', io);

io.on('connection', socket => {
    console.log("Nuevo cliente conectado", socket.id);
    updatedProducts(io);
})

/*
app.get('/products',(req,res)=>{
    const limit = parseInt(req.query.limit);
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
*/