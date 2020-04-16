import request from "/service/network.js";

function getAround(opt) {
  return request({
    url: "https://restapi.amap.com/v3/geocode/regeo",
    data: {
      key: "78afced4810e78fef4e60c9be330ca06",
      location: `${opt.longitude},${opt.latitude}`,
      radius: opt.radius || 200,
      extensions:"all",
      batch:false
    },
    method: "GET",
    header: { "content-type": "application/json" }
  });
}

module.exports = {
  getAround
};
