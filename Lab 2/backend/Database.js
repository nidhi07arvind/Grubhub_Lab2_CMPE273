const MongoClient = require("mongodb").MongoClient;

class Connection {
  static connectToMongo() {
    if (this.db) return Promise.resolve(this.db);
    return MongoClient.connect(this.url, this.options).then(
      db => (this.db = db)
    );
  }
}

Connection.db = "grubhub";
Connection.url =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";
Connection.options = {
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useNewUrlParser: true
};

module.exports = { Connection };
