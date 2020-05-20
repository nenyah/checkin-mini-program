import { request } from "./network";
import { Config } from "../config/api";
function getConfig(params) {
  return request({
    url: Config,
    data: {
      name: params.value,
    },
  });
}
module.exports = {
  getConfig,
};
