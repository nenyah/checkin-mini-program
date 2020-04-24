import { request } from "./network";
import { Clientsinfo } from "../config/api";

function getClients(param) {
  const current = param.current || 1;
  const orgName = param.orgName || "";
  const paramCurrent = current ? `?current=${current}` : "";
  const paramOrgName = orgName ? `&orgName=${encodeURI(orgName)}` : "";
  return request({
    url: Clientsinfo + paramCurrent + paramOrgName,
    method: "GET",
  });
}

module.exports = {
  getClients,
};
