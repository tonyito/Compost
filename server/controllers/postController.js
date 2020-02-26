const db = require('../models/compostModels');

const postController = {};

//controller to get page location ID
postController.getPageUnique = (req, res, next) => {
  const query = `SELECT * FROM pages WHERE param = $1`;
  db.query(query, [req.body.location])
    .then(data => {
      res.locals.locationID = data.rows[0].id;
      next();
    })
    .catch(err =>
      next({
        log: `Express error handler caught getPageUnique from postController error ${err}`,
        status: 400,
        message: { err: `${err}` },
      }),
    );
};

//controller to POST changes to the database
postController.postUpdate = async (req, res, next) => {
  if (!req.body.updatedItems) return next();
  const updatedItems = req.body.updatedItems;
  try {
    for (value of updatedItems) {
      const sendQuery = await db.query(
        `UPDATE items SET user_id = $1, name = $2 WHERE id = $3`,
        [value.user, value.name, value.id],
      );
    }
    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught postUpdate error ${err}`,
      status: 400,
      message: { err: `${err}` },
    });
  }
};

//controller to POST new items to the database
postController.postNew = async (req, res, next) => {
  if (!req.body.newItems) return next();
  const newItems = req.body.newItems;
  try {
    for (value of newItems) {
      const sendQuery = await db.query(
        `INSERT INTO items (page_id, user_id, name, complete) VALUES ($1, $2, $3, false)`,
        [res.locals.locationID, value.user, value.name],
      );
    }
    next();
  } catch (err) {
    next({
      log: `Express error handler caught postNew error ${err}`,
      status: 400,
      message: { err: `${err}` },
    });
  }
};

module.exports = postController;
