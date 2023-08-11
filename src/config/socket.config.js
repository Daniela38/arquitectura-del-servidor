import { Server } from 'socket.io';

export default function configureSocket(httpServer, app) {
    const io = new Server(httpServer);
    app.set('io', io);

    io.on('connection', socket => {
        console.log("Nuevo cliente conectado", socket.id);
        updatedProducts(io);
        chat(socket, io);
    });
}