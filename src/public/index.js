const socket = io();

const updateProduct = (products) => {
    const container = document.getElementById('container');
    products.forEach(product => {
        container.innerHTML = ` 
            <h6>{{this.title}}</h6>
            <p>{{this.category}}</p>
            <p>{{this.description}}</p>
            <p>{{this.price}}</p>
            <p>{{this.stock}}</p>
        `;
    });
};

socket.on('connect', () => {
    socket.emit('newConnection', socket .id);
});

socket.on('updatedProducts', (products) => {
    updateProduct(products);
});