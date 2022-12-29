const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controllers');

router.get('/lists', Controller.getAllLists);
router.post('/create-list', Controller.createList);
router.post('/update-task', Controller.updateTask);

module.exports = router;
