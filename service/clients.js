import { request } from "./network.js";
import { Clientsinfo, Clientslabels } from "../config/api.js";

function getClients(param) {
  const current = param.current || 1;
  return request({
    url: Clientsinfo + `?current=${current}`,
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
  getClients,
  getClientslabels,
};
