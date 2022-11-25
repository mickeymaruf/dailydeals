const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const moment = require('moment')
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ld8a5ol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const db = client.db("dailydeals");
        const categoriesCollection = db.collection("categories");
        const productsCollection = db.collection("products");
        const bookingsCollection = db.collection("bookings");
        const usersCollection = db.collection("users");

        // categories
        app.get('/categories', async (req, res) => {
            const categories = await categoriesCollection.find({}).toArray();
            res.send(categories);
        })

        // products
        app.get('/products', async (req, res) => {
            const products = await productsCollection.find({}).toArray();
            res.send(products);
        })
        // get products by category
        app.get('/products/category/:category_slug', async (req, res) => {
            const category_slug = req.params.category_slug;
            const query = { category: category_slug };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })
        app.post('/products', async (req, res) => {
            const product = req.body;
            // adding date & time
            const createdAt = moment().format();
            product.createdAt = createdAt;

            const result = await productsCollection.insertOne(product);
            res.send(result);
        })
        // get products by seller email
        app.get('/myproducts', async (req, res) => {
            const email = req.query.email;
            const query = { sellerEmail: email };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })

        // bookings
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })

        // users
        app.get('/users/role', async (req, res) => {
            const query = { email: req.query.email };
            const role = await usersCollection.findOne(query, { projection: { _id: 0, role: 1 } });
            res.send(role);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    } finally {
        // 
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send({
        status: 'success',
        message: 'Daily Deals app server is running...🥳'
    })
})

app.listen(port, () => {
    console.log(`Daily Deals app listening on port ${port}`)
})