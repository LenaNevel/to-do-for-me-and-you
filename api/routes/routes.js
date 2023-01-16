const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controllers');

router.get('/lists', Controller.getAllLists);
router.post('/edit-list', Controller.editList);
router.post('/delete-list', Controller.deleteList);

module.exports = router;
