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
            jsonData = response.data.choices[0].text;
            res.status(200).send(jsonData);
        } catch (error) {
            console.error(error);
        }
    }
});

app.post('/api/match', bodyParser.text(), async (req, res) => {
    console.log("API Match was called");
    console.log(req.body);
});

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// // Connect to Mongo DB
// mongoose.connect(process.env.MONGODB_URI, 
//     {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     }
// )
// .then(() => {
//     console.log('MongoDB connected...');

//     // Start Server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
// })
// .catch(err => console.log(err));

// // Define API Routes
// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello from Express!'});
// });

// app.get('/api/products', (req, res) => {
//     const Flooring = mongoose.connection.collection('flooring');
//     console.log("Serving products...");

//     Flooring.find({}).toArray((err, products) => {
//         console.log("Finding products...");
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error retrieving products');
//             return;
//         }
//         console.log("Success!");
//         res.send({ data: products });
//     });
// });

// app.post('/api/prompt', bodyParser.text(), async (req, res) => {
//     const prompt = req.body;
//     console.log(prompt);
//     if (!prompt) {
//         res.status(400).send({ error: 'No prompt provided!' });
//     } else {
//         openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: prompt,
//             max_tokens: 300,
//             format: "text"
//         }).then(response => {
//             console.log(response.data.choices[0].text);
//             jsonData = response.data.choices[0].text;
//             res.status(200).send(jsonData);
//         }).catch(error => {
//             console.error(error);
//         });
//     }
// });

// app.post('/api/match', bodyParser.text(), async (req, res) => {
//     console.log("MAAAATCHIIIING!!!");
//     console.log(req.body);
// });

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/public')));

// // The "catch-all" handler: for any request that doesn't match one above, 
// // send back React's index.html file.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

// // Start Server
// // const PORT = process.env.PORT || 1337;
// // app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
