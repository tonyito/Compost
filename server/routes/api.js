const express = require('express');

const mainController = require('../controllers/mainController.js');
const postController = require('../controllers/postController.js');

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
      users: res.locals.users,
    };
    res.status(200).json(response);
  },
);

//route post requests to /api/items/ here
router.post(
  '/items',
  postController.getPageUnique,
  postController.postUpdate,
  postController.postNew,
  (req, res) => res.sendStatus(200),
);

//route post requests to /api/pages/ here
router.post(
  '/pages', postController.postNewPage,
  (req, res) => res.sendStatus(200),
);

module.exports = router;
