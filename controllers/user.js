const User = require('../models/user');

exports.getUserData = (req, res, next) => {
    const { userid:userId } = req.headers;
    console.log('UI', userId);
    User.findById(userId)
        .then(doc => {
            res.status(200).json({
                user: doc
            });
        })
        .catch(err => res.status(200).json({ message: 'No queries were made'}));
};