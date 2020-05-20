import { request } from "./network";
import { Clientsinfo, Customerinfo } from "../config/api";

function getClients(params) {
  return request({
    url: Clientsinfo,
    data: {
      ...params,
    },
  });
}
function getCustomer(params) {
  return request({
    url: Customerinfo,
    data: {
      ...params,
    },
  });
}
module.exports = {
  getClients,
  getCustomer,
};
