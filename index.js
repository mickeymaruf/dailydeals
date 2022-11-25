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

        // categories
        app.get('/categories', async (req, res) => {
            const categories = await categoriesCollection.find({}).toArray();
            res.send(categories);
        })
        // product
        app.post('/products', async (req, res) => {
            const product = req.body;
            // adding date & time
            const createdAt = moment().format();
            product.createdAt = createdAt;

            const result = await productsCollection.insertOne(product);
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