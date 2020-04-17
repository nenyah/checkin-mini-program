import { request } from "./network.js";
import { Clientsinfo, Clientslabels } from "../config/api.js";

function getClientsinfo() {
  return request({
    url: Clientsinfo,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getClientslabels() {
  return request({
    url: Clientsinfo,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

module.exports = {
  getClientsinfo,
  getClientslabels,
};
