const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controllers');

const path = './data/to-do-list-data.json'
router.post('/create-list', Controller.createList);

module.exports = router;

module.exports = router;