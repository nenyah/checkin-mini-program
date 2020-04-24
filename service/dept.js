import { request } from "./network";
import { DeptInfo } from "../config/api";

function getDeptInfo(options) {
  return request({
    url: `${DeptInfo}?dingUserId=${options.dingUserId}`,
    method: "GET",
  });
}
module.exports = {
  getDeptInfo,
};
