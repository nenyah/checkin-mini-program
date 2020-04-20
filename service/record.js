import { request } from "./network.js";
import { CheckInRecord } from "../config/api.js";

function getRecord(options) {
  return request({
    url: CheckInRecord,
    method: "POST",
    data: JSON.stringify({ userid: options.userid, date: options.date }),
    headers: {
      Token: options.Token || "",
    },
  });
}

module.exports = {
  getRecord,
};
