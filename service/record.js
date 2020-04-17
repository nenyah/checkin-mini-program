import { request } from "./network.js";
import { CheckInRecord } from "../config/api.js";

function getRecord() {
  return request({
    url: CheckInRecord,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

module.exports = {
  getRecord,
};
