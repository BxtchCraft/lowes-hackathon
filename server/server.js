// Import Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
const { MongoClient, ServerApiVersion } = require('mongodb');

// Setup OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Setup App
const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlast");
    } catch (err) {
        console.error("Failed to connect to MongoDB Atlas", err);
    }
}

connectToDB();

app.get('/api/products', async (req, res) => {
    console.log("Serving products...");
    try {
        const Flooring = client.db('products').collection('flooring');
        const products = await Flooring.find({}).toArray();
        console.log("Success!");
        res.send({data: products});
    } catch (err) {
        console.log("Error executing query:", err);
        res.status(500).send('Error retrieving products');
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        // const Flooring = client.db('products').collection('flooring');
        const database = client.db('products');
        const flooring = database.collection('flooring');
        const query = { "item.item_number": parseInt(req.params.id) }
        const product = await flooring.findOne(query);
        console.log("PRODUCT: ", product);
        // const product = await Flooring.findOne({"item.item_number": req.params.id});
        res.send({item: product.item});
    } catch (err) {
        res.status(500).send("Error" + err.message);
    }
});

app.post('/api/prompt', bodyParser.text(), async (req, res) => {
    const prompt = req.body;
    console.log(prompt);
    if (!prompt) {
        res.status(400).send({ error: 'No prompt provided!' });
    } else {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 300,
                format: "text"
            });
            console.log(response.data.choices[0].text);
            const jsonData = response.data.choices[0].text;
            res.status(200).send(jsonData);
        } catch (error) {
            console.error(error);
        }
    }
});

app.post('/api/keywords', bodyParser.text(), async (req, res) => {
    const keywordPrompt = req.body;
    if(!keywordPrompt) {
        res.status(400).send({error: 'No prompt provided!' });
    } else {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: keywordPrompt,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            });

            console.log(response.data.choices[0].text.trim());
            const sanitized = {
                "result": response.data.choices[0].text.trim()
            };
            
            res.status(200).send(sanitized);
        } catch (error) {
            console.error(error);
        }
    }
});

app.post('/api/match', bodyParser.json(), async (req, res) => {
    console.log("BODY!!!", req.body);
    let productString = '';
    req.body.products.forEach(product => {
        productString += `Product: ${product.item.product}, Item Number: ${product.item.item_number}\n`;
    });

    const matchPrompt = `You have a list of products with their product names, and item numbers. Based on the given keywords "${req.body.keywords}", your task is to analyze the product names and match them with the keywords. Please return an array of item numbers (7-digit numeric values) for the top 3 products that best match the keywords. 
    Products:\n${productString}`;

    if(!req.body.keywords || !req.body.products) {
        console.log(req.body);
        res.status(400).send({error: 'No keywords or products!'});
    } else {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: matchPrompt,
                max_tokens: 500,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            });

            console.log(response.data.choices[0].text);
            const itemNumbers = JSON.stringify(response.data.choices[0].text);
            res.status(200).send(itemNumbers);
        } catch (error) {
            console.error(error);
        }
    }
});

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
