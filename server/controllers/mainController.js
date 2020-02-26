const db = require('../models/compostModels');

const mainController = {};


//controller to get all items
mainController.getItems = (req, res, next) => {
    const query = 'SELECT * FROM items';
    db.query(query)
    .then ( data => {
      res.locals.items = data.rows;
      next();
    }
    )
    .catch (err => next({
      log: `Express error handler caught getItems error ${err}`,
      status: 400,
      message: { err: `${err}`},
    }))
};

module.exports = mainController;
