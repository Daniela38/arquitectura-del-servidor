import { productsRepository } from "../repositories/index.js";

class ProductsService {
    constructor() {
        this.productRepository = productsRepository;
    }

    getProducts = async(limit, page, sort, category, available) => {
        return await this.productRepository.getProducts(limit, page, sort, category, available);
    }

    getAllMock = async() => {
        const mockProducts = [];
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            status: faker.datatype.boolean(),
            stock: faker.number.int({ min: 0, max: 50 }),
            category: faker.commerce.productAdjective(),
            thumbnails: [],
            code: faker.string.uuid()
        }
        for (let i = 0; i < 100; i++) {
            mockProducts.push(product);
        }
        return mockProducts
    }

    getProductsById = async(id) => {
        try{
            const product = await this.productRepository.getProductsById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product
        } catch (error) {
            throw error;
        }
    }

    addProduct = async(bodyPorduct) => {
        return await this.productRepository.addProduct(bodyPorduct);
    }

    updateProduct = async(id, newField) => {
        return await this.productRepository.updateProduct(id, newField);
    }

    deleteProduct = async(id) => {
        return await this.productRepository.deleteProduct(id);
    }
}

export default ProductsService;