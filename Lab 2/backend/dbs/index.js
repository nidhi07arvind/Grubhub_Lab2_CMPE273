var MongoClient = require("mongodb").MongoClient;
var db = {};

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

/*db.findUser = function(user, successCallback, failureCallback) {
  var collection = client.db("grubhub").collection("buyer");
  var query = { name: user.name };

  collection.findOne(query, function(err, result) {
    if (err) {
      failureCallback(err);
      return;
    } else {
      successCallback(result[0]);
    }
  });
};*/

module.exports = { getConnectionMongo };
module.exports = db;
