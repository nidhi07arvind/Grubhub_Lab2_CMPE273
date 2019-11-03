var bcrypt = require("bcrypt");
var MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://admin:admin@lab0-stjgi.mongodb.net/test?retryWrites=true&w=majority";

function handle_request(message, callback) {
  console.log("Inside Kafka Backend AddItem");
  console.log("Message: ", message);

  //   const userSession = message.session.user;

  //   var res_id = userSession.res_id;
  //   var res_name = userSession.res_name;

  //   console.log("res_id", res_id);
  //   console.log("res_name", res_name);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Success");

      var collection = client.db("grubhub").collection("item");

      const item_id = Math.floor(Math.random() * 1000);

      console.log("Item ID final:", item_id);

      var item = {
        res_id: message.res_id,
        res_name: message.res_name,
        item_id: item_id,
        item_name: message.name,
        description: message.description,
        price: message.price,
        cuisine: message.cuisine,
        section: message.section,
        image: message.image
      };

      console.log("item", item);

      collection.insertOne(item, function(err, result) {
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
