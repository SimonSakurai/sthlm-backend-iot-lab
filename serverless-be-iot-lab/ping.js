"use strict";

const AWS = require("aws-sdk");
const iot = new AWS.IotData({
  endpoint: "a2058z6ulhumcw-ats.iot.eu-north-1.amazonaws.com",
});

const pong = (client) => {
  const pongMessage = {
    topic: `pong/${client}`,
    payload: JSON.stringify({ message: "pong" }),
    qos: 0,
  };
  return iot.publish(pongMessage).promise();
};

module.exports.ping = async (event) => {
  console.log(event);

  if (event.message && event.message === "ping") {
    return pong(event.client);
  }
  console.log("Message wasn't ping, ignoring...");
};
