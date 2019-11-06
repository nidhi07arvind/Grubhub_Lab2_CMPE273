const { getConnectionMongo } = require("../dbs/index");
var bcrypt = require("bcrypt");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Owner-Signup");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  var res_id = Math.floor(Math.random() * 100);
  var res_name = message.RestaurantName;
  console.log(res_id);

  /*MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Successfully");

      const collection = client.db("grubhub").collection("restaurant");*/

  var restaurant = {
    res_id: res_id,
    res_name: message.RestaurantName,
    zipcode: message.ZipCode
  };

  connection
    .collection("restaurant")
    .insertOne(restaurant, function(err, result) {
      if (err) {
        console.log("Error in adding restaurant");
      } else {
        console.log("Added restaurant successfully");
      }
    });

  var owner_id = Math.floor(Math.random() * 1000);
  const hashedPassword = bcrypt.hashSync(message.Password, 10);

  var owner = {
    name: message.FirstName,
    owner_id: owner_id,
    res_id: res_id,
    email: message.Email,
    password: hashedPassword,
    accounttype: message.Accounttype,
    res_name: res_name
  };

  connection.collection("owner").insertOne(owner, function(err, result) {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, []);
    }
  });
  client.close();
}

exports.handle_request = handle_request;

/*const { getConnectionMongo } = require("../dbs/index");
var bcrypt = require("bcrypt");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Owner-Signup");
  console.log("Message: ", message);

  
  const { connection, client } = await getConnectionMongo();

  var res_id = Math.floor(Math.random() * 100);
  var res_name = message.RestaurantName;
  console.log(res_id);

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB Successfully");

      const collection = client.db("grubhub").collection("restaurant");

      var restaurant = {
        res_id: res_id,
        res_name: message.RestaurantName,
        zipcode: message.ZipCode
      };

      collection.insertOne(restaurant, function(err, result) {
        if (err) {
          console.log("Error in adding restaurant");
        } else {
          console.log("Added restaurant successfully");
        }
      });

      client.close();
    }
  });

  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected to DB successfully");

      const collection = client.db("grubhub").collection("owner");

      var owner_id = Math.floor(Math.random() * 1000);
      const hashedPassword = bcrypt.hashSync(message.Password, 10);

      var owner = {
        name: message.FirstName,
        owner_id: owner_id,
        res_id: res_id,
        email: message.Email,
        password: hashedPassword,
        accounttype: message.Accounttype,
        res_name: res_name
      };

      collection.insertOne(owner, function(err, result) {
        if (err) {
          callback(err, "Error");
          //   console.log("Error in adding owner");
          //   res.writeHead(400, {
          //     "Content-Type": "text/plain"
          //   });
          //   res.end("Error in adding Owner");
        } else {
          callback(null, []);
          //   console.log("Adding a owner successful!");
          //   res.writeHead(200, {
          //     "Content-type": "text/plain"
          //   });
          //   res.end("Adding a user successful!");
        }
      });
      client.close();
    }
  });
}

exports.handle_request = handle_request;
*/
