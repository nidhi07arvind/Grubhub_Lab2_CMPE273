const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend SendChat");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  const new_msg = {
    buyer_msg: message.type_message
  };

  console.log("new msg:", new_msg);

  connection
    .collection("orders")
    .updateOne(
      { email: message.email, status: { $ne: "complete" } },
      { $push: { "chats.buyer_msg.bm": message.type_message } },
      function(err, result) {
        if (err) {
          callback(err, "Error");
        } else {
          // console.log("inside kafka query", result);
          // result.chats = result.chats || [];
          // result.chats.push(new_msg);
          // console.log("inside kafka query pushed", result);

          callback(null, result);
        }
      }
    );

  client.close();
}

exports.handle_request = handle_request;
