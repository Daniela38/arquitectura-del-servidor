import chai from "chai";
import supertest from "supertest";
import bcrypt from "bcrypt";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Session endpoint Test", () => {
    describe.only("Session Test", () => {
      let cookieName = "loginToken";
      it("A user must register correctly", async () => {
        const validRoles = ["admin", "premium", "user"];
        const newUser = {
          firstName: "Daniela",
          lastName: "Zaccarello",
          email: "danizaccarello@gmail.com",
          age: 29,
          password: "dani1234",
          cart: "cartId",
          role: "admin",
        };
        const response = await requester.post("/api/sessions/register").send(newUser);
        expect(response.statusCode).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(response.body).to.be.ok;
      });
      it("The registered user role must only have values ​​like 'admin', 'user' or 'premium'", async () => {
        const validRoles = ["admin", "premium", "user"];
        const newUser = {
          firstName: "Daniela",
          lastName: "Zaccarello",
          email: "danizaccarello@gmail.com",
          age: 29,
          password: "dani1234",
          cart: "cartId",
          role: "admin",
        };
        const response = await requester.post("/api/sessions/register").send(newUser);
        expect(response.statusCode).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(validRoles.includes(response.body.role)).to.be.true;
      });
      it("A user must be able to log in and receive a cookie", async () => {
          const newUser = {
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            age: 30,
            password: "testpassword",
            cart: "cartId",
            role: "user",
          };
          const registrationResponse = await requester.post("/api/sessions/register").send(newUser);
          expect(registrationResponse.statusCode).to.equal(200);
          expect(registrationResponse.ok).to.equal(true);
          const loginResponse = await chai.request(requester).post("/api/sessions/login").send({
              email: newUser.email,
              password: newUser.password,
            });
          expect(loginResponse.statusCode).to.equal(200);
          expect(loginResponse.ok).to.equal(true);
          expect(loginResponse).to.have.cookie(cookieName);
        });
    });
  });