import { request } from "./network";
import { DeptInfo } from "../config/api";

function getDeptInfo(params) {
  return request({
    url: DeptInfo,
    data: {
      ...params,
    },
  });
}
module.exports = {
  getDeptInfo,
};
