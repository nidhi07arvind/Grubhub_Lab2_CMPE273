const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Owner Dashboard");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("item")
    .find({ res_id: message.res_id })
    .toArray(function(err, result) {
      if (err) callback(err, "Error");
      else {
        callback(null, result);
      }
    });

  client.close();
}
exports.handle_request = handle_request;
