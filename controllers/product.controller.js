require("dotenv").config()

const { ProductModel } = require("../model/product.model")

//@description   get Products (Filter, sort, pagination)
//@route         GET /products/
//@access        Public-All
const getAllProducts = async (req, res) => {
    // filter = {
    //     "category":["Mobiles","laptops","Tablets","Accessories"],
    //     "brand": ["Apple", "Google", "Huawei", "Samsung","Xiaomi"]
    // }
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    
    try {
        let condition = {}
        if (!req.query.admin) {
            condition.deleted = { $ne: true }
        }

        let query = ProductModel.find(condition);
        let totalProductsQuery = ProductModel.find(condition);

        // console.log(req.query.category.split(','));

        if (req.query.category) {
            query = query.find({ category: { $in: req.query.category.split(',') } });
            totalProductsQuery = totalProductsQuery.find({
                category: { $in: req.query.category.split(',') },
            });
        }
        if (req.query.brand) {
            query = query.find({ brand: { $in: req.query.brand.split(',') } });
            totalProductsQuery = totalProductsQuery.find({ brand: { $in: req.query.brand.split(',') } });
        }
        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
        }

        const totalDocs = await totalProductsQuery.count().exec();
        // console.log({ totalDocs });

        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit;
            const page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }


        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@description   create new Product
//@route         POST /products/
//@access        Admin only
const createProduct = async (req, res) => {
    const { title, price, description, brand, category } = req.body;
    if (!title || !price || !description || !brand || !category) {
        return res.status(400).json({ message: "Missing required fields" })
    }

    try {
        const product = new ProductModel(req.body);
        await product.save();
        return res.status(201).json({ message: "New Product Added Successfully", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//@description   get Product by id
//@route         GET /products/:id
//@access        Public-All
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id);
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   update Product
//@route         PATCH /products/:id
//@access        Admin only
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        await product.save()
        return res.status(200).json({ message: "Product Updated Successfully", product });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllProducts, createProduct, getProductById, updateProduct }