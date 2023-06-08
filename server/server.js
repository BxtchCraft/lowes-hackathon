// Import Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

// const openAIAPI = new openai.OpenAIApi(process.env.OPEN_AI_API_KEY);
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

// Setup App
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define API Routes
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express!'});
});

app.post('/api/prompt', bodyParser.text(), async (req, res) => {
    const prompt = req.body;
    console.log(prompt);
    if (!prompt) {
        res.status(400).send({ error: 'No prompt provided!' });
    } else {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 300,
            format: "text"
        }).then(response => {
            res.status(200).send(response.data.choices[0].text);
            // console.log(response.data.choices[0].text);
        }).catch(error => {
            console.error(error);
        });
        // axios.post(
        //     'https://api.openai.com/v1/engines/davinci-codex/completions',
        //     {
        //         'prompt': prompt,
        //         'max_tokens': 100,
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // )
        // .then(response => {
        //     console.log(response.data.choices[0].text.trim());
        //     res.status(200).send({ response: response.data.choices[0].text.trim() });
        // })
        // .catch(err => {
        //     console.error(err);
        //     res.status(500).send({ error: 'An error occurred with the OpenAI API.' });
        // });
    }
});

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/public')));

// The "catch-all" handler: for any request that doesn't match one above, 
// send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Start Server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
