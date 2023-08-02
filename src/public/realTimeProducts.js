const socket = io();

const updateProduct = (products) => {
    const container = document.getElementById('container');
    container.innerHTML = '';
    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.innerHTML = ` 
            <h6>{${product.title}}</h6>
            <p>{${product.category}}</p>
            <p>{${product.description}}</p>
            <p>{${product.price}}</p>
            <p>{${product.stock}}</p>
        `;
        container.appendChild(productContainer);
    });
};

socket.on('connect', () => {
    socket.emit('newConnection', socket .id);
});

socket.on('updatedProducts', (products) => {
    updateProduct(products);
});