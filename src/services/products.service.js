import DbProductManager from "../dao/managers/DBProductManager.js";

class ProductsService {
    constructor() {
        this.dao = new DbProductManager();
    }

    getProducts = async(limit, page, sort, category, available) => {
        return await this.dao.getProducts(limit, page, sort, category, available);
    }

    getProductsById = async(id) => {
        return await this.dao.getProductsById(id);
    }

    addProduct = async(bodyPorduct) => {
        return await this.dao.addProduct(bodyPorduct);
    }

    updateProduct = async(id, newField) => {
        return await this.dao.updateProduct(id, newField);
    }

    deleteProduct = async(id) => {
        return await this.dao.deleteProduct(id);
    }
}

export default ProductsService;