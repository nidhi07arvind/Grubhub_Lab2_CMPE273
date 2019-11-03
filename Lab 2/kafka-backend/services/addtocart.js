const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend AddtoCart");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();

  var cart_item = {
    item_id: message.item_id,
    item_name: message.item_name,
    res_id: message.res_id,
    res_name: message.res_name,
    buyer: message.buyer,
    price: message.price
  };

  connection.collection("cart").insertOne(cart_item, function(err, result) {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, []);
    }
  });
  client.close();
}

exports.handle_request = handle_request;
