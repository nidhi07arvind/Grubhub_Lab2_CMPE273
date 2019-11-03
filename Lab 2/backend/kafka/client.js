//server start - .\bin\windows\kafka-server-start.bat .\config\server.properties

//topic create - kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test

//list topics - kafka-topics.bat --list --zookeeper localhost:2181

var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function(err, response) {
    if (err) console.error(err);
    else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

//
exports.make_request = make_request;
