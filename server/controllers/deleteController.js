const db = require('../models/compostModels');

const deleteController = {};

//controller to delete a user from a selected page
deleteController.deleteUser = (req, res, next) => {
    const query = `DELETE FROM users WHERE id = $1`;
    db.query(query, [req.body.id])
      .then(() => {
        return next();
      })
      .catch(err => {
        return next({
          log: `Express error handler caught deleteUser error ${err}`,
          status: 400,
          message: { err: `${err}` },
        });
      });
  };

//controller to delete an item from a selected page
deleteController.deleteItem = (req, res, next) => {
    const query = `DELETE FROM items WHERE id = $1`;
    db.query(query, [req.body.id])
      .then(() => {
        return next();
      })
      .catch(err => {
        return next({
          log: `Express error handler caught deleteItem error ${err}`,
          status: 400,
          message: { err: `${err}` },
        });
      });
  };
  
  module.exports = deleteController;