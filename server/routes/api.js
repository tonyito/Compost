const express = require('express');

const mainController = require('../controllers/mainController.js');

const router = express.Router();

//route all get requests to /api/:id here
router.get(
  '/:id',
  mainController.getPageUnique,
  mainController.getList,
  mainController.getUsers,
  (req, res) => {
    const response = {
      information: res.locals.info,
      list: res.locals.list,
      users: res.locals.users
    };
    res.status(200).json(response);
  }
);

//route all post requests to /api/ here
router.post('/', (req, res) => res.status(200));

module.exports = router;
