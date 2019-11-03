const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Cuisine");
  console.log("Message: ", message);

  const cuisine = message.cuisine;

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("item")
    .find({ cuisine: cuisine })
    .toArray(function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        callback(null, result);
      }
    });
  client.close();
}

exports.handle_request = handle_request;
