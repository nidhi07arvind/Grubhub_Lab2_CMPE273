const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend DeleteItem");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("item")
    .deleteMany({ item_id: message.item_id }, function(err, result) {
      if (err) callback(err, "Error");
      else {
        callback(null, []);
      }
    });

  client.close();
}

exports.handle_request = handle_request;
