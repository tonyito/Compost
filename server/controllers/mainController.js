const db = require('../models/compostModels');

const mainController = {};

//controller to get info from a selected page
mainController.getPageUnique = (req, res, next) => {
  const query = `SELECT * FROM pages WHERE param = $1`;
  db.query(query, [req.params.id])
    .then(data => {
      res.locals.info = {
        date: data.rows[0].date,
        brief: data.rows[0].brief,
        title: data.rows[0].title,
        location: data.rows[0].location,
      };
      res.locals.locationID = data.rows[0].id;
      return next();
    })
    .catch(err => {
      return next({
        log: `Express error handler caught getPageUnique from mainController error ${err}`,
        status: 400,
        message: { err: `${err}` },
      });
    });
};

//controller to get list of items from a selected page
mainController.getList = (req, res, next) => {
  const query = `SELECT items.id AS id, items.name AS item_name, user_id FROM items 
                INNER JOIN pages ON items.page_id = $1 AND pages.id = $1`;
  db.query(query, [res.locals.locationID])
    .then(data => {
      const output = [];
      for (value of data.rows) {
        output.push({
          id: value.id,
          user: value.user_id,
          itemName: value.item_name,
        });
      }
      output.sort((a, b) => {
        return a.id - b.id;
      });
      res.locals.list = output;
      return next();
    })
    .catch(err => {
      return next({
        log: `Express error handler caught getList error ${err}`,
        status: 400,
        message: { err: `${err}` },
      });
    });
};

//controller to get users from a selected page
mainController.getUsers = (req, res, next) => {
  const query = `SELECT * FROM users WHERE page_id = $1`;
  db.query(query, [res.locals.locationID])
    .then(data => {
      const output = {};
      for (value of data.rows) {
        const temp = {
          id: value.id,
          phone: value.phone,
          email: value.email,
          name: value.name,
        };
        output[value.id] = temp;
      }
      res.locals.users = output;
      return next();
    })
    .catch(err => {
      return next({
        log: `Express error handler caught getUsers error ${err}`,
        status: 400,
        message: { err: `${err}` },
      });
    });
};

module.exports = mainController;
