const express = require('express');
const router = express.Router();
const dataController = require('../controllers/apiController');


router.get('/', (req,res) => {
  res.render('home');
})

router.post('/show', dataController.showData);

module.exports = router;
