const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log('DB was successfully connected');
}).catch((err) => {
    console.log('DB error', err);
});


app.use(express.json());
app.use('/auth', require('./routes/auth.js'));

app.get('/', (req, res) => {
    res.json('asd');
});

app.listen(PORT, () => {
    console.log(`server was started on port ${PORT}`)
});
