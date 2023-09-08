import { Server } from 'socket.io';
import { loggerInfo } from '../utils/logger.js';

export default function configureSocket(httpServer, app) {
    const io = new Server(httpServer);
    app.set('io', io);

    io.on('connection', socket => {
        const info = loggerInfo();
        info.info("Nuevo cliente conectado", socket.id);
        updatedProducts(io);
        chat(socket, io);
    });
};