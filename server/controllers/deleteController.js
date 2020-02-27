const db = require('../models/compostModels');

const deleteController = {};

//controller to get users from a selected page
deleteController.deleteUser = (req, res, next) => {
    const query = ``;
    db.query(query)
      .then(data => {

        return next();
      })
      .catch(err => {
        return next({
          log: `Express error handler caught deleteUsers error ${err}`,
          status: 400,
          message: { err: `${err}` },
        });
      });
  };
  
  module.exports = deleteController;