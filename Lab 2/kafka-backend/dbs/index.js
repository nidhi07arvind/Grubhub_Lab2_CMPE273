var MongoClient = require("mongodb").MongoClient;
var db = {};

// const uri =
//   "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

const getConnectionMongo = () => {
  return new Promise((resolve, reject) => {
    const uri =
      "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";
    MongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        const connection = client.db("grubhub");
        return err ? reject(err) : resolve({ connection, client });
      }
    );
  });
};

// MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
//   if (err) {
//     console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
//   } else {
//     console.log("Connected to DB Success");

//     //return client;
//   }
// });

// db.findUser = function(user, successCallback, failureCallback) {
//   var collection = client.db("grubhub").collection("buyer");
//   var query = { email: req.body.Email };

//   collection.findOne(query, function(err, result) {
//     if (err) {
//       failureCallback(err);
//       return;
//     } else {
//       uccessCallback(result[0]);
//     }
//   });
// };

module.exports = { getConnectionMongo };
