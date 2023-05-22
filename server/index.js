const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const moment = require('moment')
const jwt = require('jsonwebtoken')
const stripe = require("stripe")(process.env.STRIPE_SK);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ status: 'unauthorized access' });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ status: 'forbidden access' });
        }
        req.decoded = decoded;
        next();
    });

}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ld8a5ol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const db = client.db("dailydeals");
        const categoriesCollection = db.collection("categories");
        const productsCollection = db.collection("products");
        const bookingsCollection = db.collection("bookings");
        const usersCollection = db.collection("users");
        const reportedProductsCollection = db.collection("reportedProducts");
        const paymentsCollection = db.collection("payments");
        const conversationsCollection = db.collection("conversations");
        const messagesCollection = db.collection("messages");

        // middlewares
        const verifySeller = async (req, res, next) => {
            const email = req.decoded.email;
            // checking user is exist and role is seller or not
            const user = await usersCollection.findOne({ email, role: "seller" });
            if (!user) {
                return res.status(403).send({ status: 'forbidden access' });
            }
            next();
        }

        // jwt
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const user = await usersCollection.findOne({ email });
            if (!user) {
                return res.status(403).send({ accessToken: '' });
            }
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
            res.send({ 'accessToken': token })
        })

        // categories
        app.get('/categories', async (req, res) => {
            const categories = await categoriesCollection.find({}).toArray();
            res.send(categories);
        })

        // products
        app.get('/products', async (req, res) => {
            const query = { status: { $ne: "sold" } };
            const products = await productsCollection.find(query).sort({ createdAt: -1 }).toArray();
            res.send(products);
        })
        // get products by category
        app.get('/category/:category_slug', async (req, res) => {
            const category_slug = req.params.category_slug;
            const query = { category: category_slug, status: { $ne: "sold" } };
            const products = await productsCollection.find(query).sort({ createdAt: -1 }).toArray();
            res.send(products);
        })
        // get product by id
        app.get('/products/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        })
        app.post('/products', verifyJWT, verifySeller, async (req, res) => {
            const product = req.body;
            // adding date & time
            const createdAt = moment().format();
            product.createdAt = createdAt;

            const result = await productsCollection.insertOne(product);
            res.send(result);
        })
        // advertise product
        app.put('/products/:id', verifyJWT, verifySeller, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const id = req.params.id;
            const query = { sellerEmail: decodedEmail, _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    isAdvertised: true
                },
            }
            const result = await productsCollection.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/products/:id', verifyJWT, verifySeller, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const id = req.params.id;
            const query = { sellerEmail: decodedEmail, _id: ObjectId(id) }
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })
        // get products by seller email
        app.get('/myproducts', verifyJWT, verifySeller, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const email = req.query.email;
            // checking if the queryEmail and the decodedEmail is eq or not
            if (decodedEmail !== email) {
                return res.status(403).send({ status: 'forbidden access' });
            }
            const query = { sellerEmail: email };
            const products = await productsCollection.find(query).sort({ createdAt: -1 }).toArray();
            res.send(products);
        })

        // get advertise products
        app.get('/advertisedProducts', async (req, res) => {
            const query = { isAdvertised: true, status: { $ne: "sold" } }
            const products = await productsCollection.find(query).sort({ createdAt: -1 }).toArray();
            res.send(products);
        })

        // bookings
        app.get('/myorders', verifyJWT, async (req, res) => {
            const query = { buyerEmail: req.query.email }
            const orders = await bookingsCollection.find(query).toArray();
            res.send(orders);
        })
        app.get('/bookings/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) };
            const booking = await bookingsCollection.findOne(query);
            res.send(booking);
        })
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
        app.get('/users/:email', async (req, res) => {
            const query = { email: req.params.email };
            const user = await usersCollection.findOne(query);
            res.send(user);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        // verify user
        app.get('/verifyUser', verifyJWT, async (req, res) => {
            const email = req.query.email;
            const updateDoc = {
                $set: {
                    isVerified: true
                }
            }
            const result = await usersCollection.updateOne({ email, role: "seller" }, updateDoc);
            res.send(result);
        })
        app.get('/isVerified', async (req, res) => {
            const email = req.query.email;
            const user = await usersCollection.findOne({ email });
            res.send(user?.isVerified || false);
        })

        // userIsExist
        app.get('/userIsExist', async (req, res) => {
            const query = { email: req.query.email };
            const user = await usersCollection.findOne(query);
            const isExist = user ? true : false;
            res.send({ isExist });
        })

        // users by role
        app.get('/users', verifyJWT, async (req, res) => {
            const role = req.query.role;
            const users = await usersCollection.find({ role }).sort({ createdAt: -1 }).toArray();
            res.send(users);
        })
        // delete user
        app.delete('/users/:id', async (req, res) => {
            const query = { _id: ObjectId(req.params.id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // report to admin
        app.post('/products/report/:id', verifyJWT, async (req, res) => {
            const personWhoReported = req.query.email;
            const productId = req.params.id;
            const product = req.body;
            const isExist = await reportedProductsCollection.findOne({ productId });
            if (!isExist) {
                const result = await reportedProductsCollection.insertOne({ productId, personWhoReported, ...product });
                return res.send(result);
            }
            return res.send({ insertedId: null });
        })
        // reported items
        app.get('/reportedProducts', verifyJWT, async (req, res) => {
            const reportedProducts = await reportedProductsCollection.find({}).toArray();
            res.send(reportedProducts);
        })
        app.delete('/reportedProducts/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const result = await reportedProductsCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
        })

        // payment
        app.post("/create-payment-intent", async (req, res) => {
            const order = req.body;
            const price = order.price;
            const amount = price * 100;

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: amount,
                "payment_method_types": [
                    "card"
                ],
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });
        app.post("/payments", async (req, res) => {
            const payment = req.body;
            const result = await paymentsCollection.insertOne(payment);
            const query = { _id: ObjectId(payment.orderId) };
            const updateOrderDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const updatedOrder = await bookingsCollection.updateOne(query, updateOrderDoc);

            const updateProductStatusDoc = {
                $set: {
                    status: "sold",
                }
            }
            const updatedProductStatus = await productsCollection.updateOne({ _id: ObjectId(payment.productId) }, updateProductStatusDoc);
            res.send(result);
        })

        // chat
        // conversation
        app.get("/conversations/:email", async (req, res) => {
            const query = { members: { $in: [req.params.email] } }
            const result = await conversationsCollection.find(query).toArray();
            res.send(result);
        })
        app.post("/conversations", async (req, res) => {
            const members = [req.body.senderEmail, req.body.receiverEmail]; //Array
            const body = { members };
            const result = await conversationsCollection.insertOne(body);
            res.send(result);
        })
        // message
        app.get("/messages/:conversationId", async (req, res) => {
            const query = { conversationId: req.params.conversationId }
            const result = await messagesCollection.find(query).toArray();
            res.send(result);
        })
        app.post("/messages", async (req, res) => {
            // { conversationId: "", sender: "", text: "" } 
            const body = req.body;
            const result = await messagesCollection.insertOne(body);
            const insertedDocument = await messagesCollection.findOne({ _id: result.insertedId });
            res.send(insertedDocument);
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