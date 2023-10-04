import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Cart Test", () => {
    it("The GET endpoint must retrieve a cart by its ID after it's been created", async () => {
        const cartData = {
          products: [{ product: "productoId1", quantity: 2 }],
        };
        const createCartResponse = await requester.post("/api/carts").send(cartData);
        const cartId = createCartResponse.body._id;
        const getCartResponse = await requester.get(`/api/carts/${cartId}`);
        expect(getCartResponse.status).to.equal(200);
        expect(getCartResponse.ok).to.equal(true);
        expect(Array.isArray(getCartResponse.body.products)).to.equal(true);
      });
      it("The DELETE endpoint must delete a cart by its id", async () => {
        const cartData = {
          products: [{ product: "productoId1", quantity: 2 }],
        };
        const { body } = await requester.post("/api/carts").send(cartData);
        const idDelete = body._id;
        const deleteCart = await requester.delete(`/api/carts/${idDelete}`);
        expect(deleteCart.statusCode).to.equal(200);
        expect(deleteCart.ok).to.equal(true);
        expect(Array.isArray(deleteCartResponse.body.products)).to.be.true;
        expect(deleteCartResponse.body.products).to.be.empty;
      });
      it("Must update the quantity of a product in an existing cart", async () => {
        const { body } = await requester.post("/api/carts").send({ products: [] });
        const cid = body._id;
        const addProduct = await requester.post(`/api/cart/${cid}/product/64ecfd0b13fe312b1a2482ea`).send({ quantity: 5 });
        const updateProduct = await requester.put(`/api/cart/${cid}/product/507f191e810c19729de860ea`).send({ quantity: 8 });
        expect(updateProduct.status).to.equal(200);
        expect(updateProduct.ok).to.equal(true);
        const getCartResponse = await requester.get(`/api/cart/${cid}`);
        const updatedProduct = getCartResponse.body.products.find(
          (product) => product.product === "productId1"
        );
        expect(updatedProduct.quantity).to.equal(updatedQuantity);
      });
})