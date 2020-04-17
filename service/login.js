import { request } from "./network.js";
import { Userinfo } from "../config/api.js";

function getAuthCode() {
  return new Promise((resolve, reject) => {
    my.getAuthCode({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
function getUserInfo() {
  return getAuthCode().then((res) => {
    return request({
      url: Userinfo,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(res),
    });
  });
}

module.exports = {
  getUserInfo: getUserInfo,
};
