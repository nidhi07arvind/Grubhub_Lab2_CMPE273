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
        // console.log("inside new");
        // console.log("Items in Dashboard loaded successfully");
        // console.log(result);

        // console.log(JSON.stringify(result));
        // res.status(200).send(JSON.stringify(result));
        callback(null, result);
      }
    });

  client.close();
}
exports.handle_request = handle_request;
