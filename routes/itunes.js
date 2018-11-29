const express = require('express');
const router = express.Router();

const itunesController = require('../controllers/itunes');

router.get('/:query', itunesController.search);


module.exports = router;