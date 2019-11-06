const { getConnectionMongo } = require("../dbs/index");

async function handle_request(message, callback) {
  console.log("Inside Kafka Backend AddItem");
  console.log("Message: ", message);

  const { connection, client } = await getConnectionMongo();
  const item_id = Math.floor(Math.random() * 1000);

  console.log("Item ID final:", item_id);

  var item = {
    res_id: message.res_id,
    res_name: message.res_name,
    item_id: item_id,
    item_name: message.name,
    description: message.description,
    price: message.price,
    cuisine: message.cuisine,
    section: message.section,
    image: message.image
  };

  console.log("item", item);

  connection.collection("item").insertOne(item, function(err, result) {
    if (err) {
      callback(err, "Error");
    } else {
      callback(null, []);
    }
  });

  client.close();
}

exports.handle_request = handle_request;
