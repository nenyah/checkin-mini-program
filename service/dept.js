import { request } from "./network.js";
import { DeptInfo } from "../config/api.js";

function getDeptInfo(options) {
  return request({
    url: `${DeptInfo}?dingUserId=${options.dingUserId}`,
    method: "GET",
  });
}
module.exports = {
  getDeptInfo,
};
