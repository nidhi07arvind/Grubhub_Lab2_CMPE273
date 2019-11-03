//var bcrypt = require("bcrypt-nodejs");
var bcrypt = require("bcrypt");
var MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

function handle_request(message, callback) {
  console.log("Inside Kafka Backend Signup");
  console.log("Message: ", message);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected...Success");
      const collection = client.db("grubhub").collection("buyer");
      const hashedPassword = bcrypt.hashSync(message.Password, 10);

      var buyer = {
        name: message.FirstName,
        email: message.Email,
        password: hashedPassword,
        accounttype: message.Accounttype
      };

      collection.insertOne(buyer, function(err, result) {
        if (err) {
          callback(err, "Error");
        } else {
          callback(null, []);
        }
      });

      client.close();
    }
  });
}

exports.handle_request = handle_request;
