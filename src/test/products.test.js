import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Products Test', () => {
    it('The GET endpoint /api/products must return an array of products', async () => {
        const response = await requester.get('/api/products');
        expect(response.status).to.equal(200)
        expect(response.ok).to.equal(true)
        expect(response.body).to.be('array')
    });
    it('The POST endpoint /api/products must create a product correctly', async () => {
        const newProduct = {
            title: 'Producto 1',
            description: 'Descripción producto 1',
            code: '123456Aa',
            price: 200, 
            stock: 20,
            category: 'Productos A'
        };
        const { statusCode, ok, _body } = await requester.post('/api/products').send(newProduct);
        expect(statusCode).to.equeal(201);
        expect(ok).to.equal(true);
        expect(_body.payload).to.equal(newProduct);
    });
    it('The DELETE endpoint /api/products/:id must delete a product correctly', async () => {
        const newProduct = {
            title: 'Producto 1',
            description: 'Descripción producto 1',
            code: '123456Aa',
            price: 200, 
            stock: 20,
            category: 'Productos A'
        };
        const {_body} = await requester.post('/api/products').send(newProduct);
        const id = _body.payload._id;
        const { statusCode, ok } = await requester.delete(`/api/products/${id}`);
        expect(statusCode).to.equal(200);
        expect(ok).to.equal(true);
        const { _body: deletedProduct } = await requester.get(`/api/products/${id}`);
        expect(deletedProduct.payload).to.equal(null);
    })
})