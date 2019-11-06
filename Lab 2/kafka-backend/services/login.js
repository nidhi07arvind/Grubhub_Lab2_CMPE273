const { getConnectionMongo } = require("../dbs/index");
var bcrypt = require("bcrypt");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend login");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();
  if (message.Profile === "Owner") {
    connection
      .collection("owner")
      .findOne({ email: message.Email }, function(err, result) {
        if (err) {
          console.log("Invalid Credentials!!", err);
          callback(err, null);
        } else {
          if (result) {
            console.log("User Details", result);
            console.log("got result");

            if (!bcrypt.compareSync(message.Password, result.password)) {
              console.log("Invalid Password!");
              callback(null, null);
            } else {
              console.log("result", result);
              console.log("not invalid password");
              callback(null, result);
            }
          } else {
            callback(null, null);
          }
        }
      });
  } else if (message.Profile === "Buyer") {
    connection
      .collection("buyer")
      .findOne({ email: message.Email }, function(err, result) {
        if (err) {
          console.log("Invalid Credentials!!", err);
          callback(err, null);
        } else {
          if (result) {
            console.log("User Details", result);
            console.log("got result");

            if (!bcrypt.compareSync(message.Password, result.password)) {
              console.log("Invalid Password!");
              callback(null, null);
            } else {
              console.log("result", result);
              console.log("not invalid password");
              callback(null, result);
            }
          } else {
            callback(null, null);
          }
        }
      });
  }
}

exports.handle_request = handle_request;
