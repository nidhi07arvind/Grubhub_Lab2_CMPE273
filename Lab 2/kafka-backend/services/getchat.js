const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend getchat");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("orders")
    .find({
      email: message.email,
      status: { $ne: "complete" }
      //chats: { buyer_msg }
    })
    .toArray(function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        console.log(result);
        callback(null, result);
      }
    });

  client.close();
}

exports.handle_request = handle_request;
