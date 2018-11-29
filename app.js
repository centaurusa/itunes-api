const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const userRoutes = require('./routes/user');
const itunesRoutes = require('./routes/itunes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/itunes', itunesRoutes);

mongoose.connect('mongodb+srv://shumsky:vaxky2i7tG41y4ty@cluster0-u9ogx.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(result => {
        app.listen(3080, () => console.log('Server is running'));
    });
