const express = require('express');

const mainController = require('../controllers/mainController.js');

const router = express.Router();

//route all post requests to /api/ here
router.post('/', (req, res) =>
  res.status(200)
);

//route all get requests to /api/ here
router.get('/', mainController.getItems, (req, res) =>
  res.status(200).json(res.locals.items)
);

module.exports = router;
