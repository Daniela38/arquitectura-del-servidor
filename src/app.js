
import express from 'express';
import __dirname from './utils/utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js'
import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD } from './utils/mongoDBConfig.js';

//middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('api/messages', messagesRouter);
app.use('/', viewsRouter);

//mongoDB
const MONGO = (`mongodb+srv://danizaccarello:danizaccarello@cluster0.446hjvi.mongodb.net/ecommerce`);
mongoose.connect(MONGO)
.then((conn) =>{
    console.log('Connected');
}).catch((err) => {
    console.log('Error');
});

//server
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log('Listening on ' + PORT));

//Socket.io
const io = new Server(httpServer);

app.set('io', io);

io.on('connection', socket => {
    console.log("Nuevo cliente conectado", socket.id);
    updatedProducts(io);
    chat(socket, io);
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