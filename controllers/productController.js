const Product = require('../models/productModel')
//gets all products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { "Content-Type": 'application/json' })
        res.end(JSON.stringify(products))
    } catch (err) {
        console.log(err)
    }
}
//get a single product
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, { "Content-Type": 'application/json' })
            res.end(JSON.stringify({ message: 'product does not exist' }))
        } else {
            res.writeHead(200, { "Content-Type": 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (err) {
        console.log(err)
    }
}

//create a product
async function createProduct(req, res) {
    try {

        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const { title, description, price } = JSON.parse(body)
            const product = {
                title,
                description,
                price
            }

            const newProduct = await Product.create(product)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newProduct))
        })

    } catch (err) {

    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct
}