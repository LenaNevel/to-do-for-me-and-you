const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controllers');

router.get('/lists', Controller.getAllLists);
router.post('/create-list', Controller.createList);

module.exports = router;
