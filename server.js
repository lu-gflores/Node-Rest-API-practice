const { Console } = require('console')
const http = require('http')
const { getProducts, getProduct } = require('./controllers/productController')
const products = require('./data/products')

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }
    else {
        res.writeHead(404, { "Content-Type": 'application/json' })
        res.end(JSON.stringify({ message: 'route note found' }))
    }

})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))