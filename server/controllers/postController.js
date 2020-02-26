const db = require('../models/compostModels');
const SQL = require('sql-template-strings');

const postController = {};

//controller to get info from a selected page
postController.postQuery = (req, res, next) => {
  const list = res.body.list;
  let query = '';
  for (value of list) {
    //sql-template-strings installed
    let subQuery = `UPDATE items SET user_id = ${value.user}, name = ${value.name} WHERE id = ${value.id};`
    query += subQuery;
  }
  db.query(query)
    .then(() => {
      next();
    })
    .catch(err =>
      next({
        log: `Express error handler caught getPageUnique error ${err}`,
        status: 400,
        message: { err: `${err}` }
      })
    );
};

module.exports = postController
