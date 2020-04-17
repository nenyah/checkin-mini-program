import { request } from "./network.js";
import { Clientsinfo, Clientslabels } from "../config/api.js";

function getClientsinfo(param) {
  return request({
    url: Clientsinfo + `/?userid=${param.userid}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getClientslabels() {
  return request({
    url: Clientslabels,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

module.exports = {
  getClientsinfo,
  getClientslabels,
};
