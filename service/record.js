import { request } from "./network";
import { CheckInRecord } from "../config/api";

function getRecord(options) {
  const paramDate = options.date ? `&date=${options.date}` : "";
  return request({
    url: `${CheckInRecord}?userIds=${options.userids}` + paramDate,
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
