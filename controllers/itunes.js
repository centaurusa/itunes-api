const axios = require('axios');
const User = require('../models/user');

exports.search = (req, res, next) => {
    const { query } = req.params;
    const { userid:userId } = req.headers;

    axios.get(`https://itunes.apple.com/search?term=${query}&limit=25`)
        .then(response => {
            const formattedQuery = query.split('+').join(' ').toLowerCase();
            
            User.findById(userId) 
                .then(user => {
                    // checks if a request query already exists in db
                    const existentQuery = user.queries.find(savedQuery => savedQuery.text === formattedQuery);

                    if (existentQuery) {
                        user.queries[user.queries.indexOf(existentQuery)].count++;

                        return user.save();

                    } else {
                        user.queries.push({ text: formattedQuery, count: 1})
                        return user.save();
                        // return user.updateOne({ "$push": { "queries": { text: formattedQuery, count: 1 } }});
                    }
                })
                .then(doc => {
                    res.status(200).json({
                        searchResult: response.data,
                        user: doc.toObject()
                    });
                })
                .catch(err => {
                    // user does not exist
                    const newUser = new User();
                    newUser.queries.push({
                        text: formattedQuery,
                        count: 1
                    });
                    newUser.save().then(doc => {
                        res.status(201).json({
                            searchResult: response.data,
                            user: newUser
                        })
                    });
                });

        })
        .catch(err => {
            res.status(500).json({
                message: 'Server err',
                err: err
            })
        });
};