const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Buyer Order");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("orders")
    .find({ email: message.email })
    .toArray(function(err, result) {
      if (err) callback(err, "Error");
      else {
        callback(null, result);
      }
    });

  client.close();
}
exports.handle_request = handle_request;
