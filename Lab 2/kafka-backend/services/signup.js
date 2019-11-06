const { getConnectionMongo } = require("../dbs/index");
var bcrypt = require("bcrypt");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Signup");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  const hashedPassword = bcrypt.hashSync(message.Password, 10);

  var buyer = {
    name: message.FirstName,
    email: message.Email,
    password: hashedPassword,
    accounttype: message.Accounttype
  };

  connection.collection("buyer").insertOne(buyer, function(err, result) {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, []);
    }
  });

  client.close();
}

exports.handle_request = handle_request;
