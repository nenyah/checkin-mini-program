import request from "./network.js";
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
  getAuthCode().then((res) => {
    console.log("获取用户信息", res);
    return request({
      url: Userinfo,
      method: "POST",
      data: { res },
    });
  });
}
module.exports = {
  getUserInfo,
};
