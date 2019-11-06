const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend Restaurant Details");
  console.log("Message: ", message);

  const res_num = parseInt(message.res_id);
  console.log(res_num);

  const { connection, client } = await getConnectionMongo();

  connection
    .collection("item")
    .find({ res_id: res_num })
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
