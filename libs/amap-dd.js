import { request } from "/service/network.js";
import { limitRange } from "/config/api.js";
function getAround(opt) {
  return request({
    url: "https://restapi.amap.com/v3/geocode/regeo",
    data: {
      key: "78afced4810e78fef4e60c9be330ca06",
      location: `${opt.longitude},${opt.latitude}`,
      radius: opt.radius || limitRange,
      extensions: "all",
      batch: false,
    },
    method: "GET",
    header: { "content-type": "application/json" },
  });
}

module.exports = {
  getAround,
};
