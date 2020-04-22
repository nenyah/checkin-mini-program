import { request } from "./network.js";
import { CheckInRecord } from "../config/api.js";

function getRecord(options) {
  return request({
    url: `${CheckInRecord}?userIds=${options.userids}`,
    method: "GET",
  });
}
function setRecord(options) {
  return request({
    url: CheckInRecord,
    data: JSON.stringify(options),
  });
}

module.exports = {
  getRecord,
  setRecord,
};
