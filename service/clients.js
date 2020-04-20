import { request } from "./network.js";
import { Clientsinfo, Clientslabels } from "../config/api.js";

function getClientsinfo(param) {
  return request({
    url: Clientsinfo + `/?userid=${param.userid}`,
    method: "GET",
  });
}

function getClientslabels() {
  return request({
    url: Clientslabels,
    method: "GET",
  });
}

module.exports = {
  getClientsinfo,
  getClientslabels,
};
