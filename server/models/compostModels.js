// const mongoose = require('mongoose');
// const secret = require('../../secrets.js');

// const MONGO_URI = secret;

// mongoose
//   .connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: ''
//   })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch(err => console.log(err));

// const Schema = mongoose.Schema;

// // sets a schema for the 'categories' collection
// const sampleSchema = new Schema({
//   name: String
// });

// // creats a model for the 'categories' collection that will be part of the export
// const Sample = mongoose.model('categories', sampleSchema);

// // exports all the models in an object to be used in the controller
// module.exports = {
//   Sample
// };
