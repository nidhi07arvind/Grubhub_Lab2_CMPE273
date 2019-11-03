const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend UpdateItem");
  console.log("Message: ", message);

  const item_num = parseInt(message.item_id);
  console.log(item_num);

  const { connection, client } = await getConnectionMongo();

  var newitem = {
    $set: {
      item_name: message.item_name,
      description: message.description,
      price: message.price
      //section: req.body.section,
      // image: req.body.image
    }
  };

  connection
    .collection("item")
    .updateOne({ item_id: item_num }, newitem, function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        callback(null, result);
      }
    });
  client.close();
}

exports.handle_request = handle_request;
