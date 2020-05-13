import { request } from "./network";
import { Config } from "../config/api";
function getConfig(params) {
  return request({
    url: Config + `?name=${params.value}`,
    method: "GET",
  });
}
module.exports = {
  getConfig,
};
