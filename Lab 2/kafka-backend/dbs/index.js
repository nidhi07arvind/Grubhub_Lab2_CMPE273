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

module.exports = { getConnectionMongo };
