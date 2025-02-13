require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require(`mongoose`)

const port = process.env.PORT || 3000;

app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db on the port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log("error", err);
    })






