import viewsRouter from './views.router.js';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import messagesRouter from './messages.router.js';
import sessionsRouter from './sessions.router.js';

export default function configureRoutes(app) {
    app.use('/api/sessions', sessionsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use('api/messages', messagesRouter);
    app.use('/', viewsRouter);
}