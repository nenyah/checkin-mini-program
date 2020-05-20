import { request } from "./network";
import { Userinfo } from "../config/api";

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
      data: {
        authCode: res.authCode,
      },
    });
  });
}

module.exports = {
  getUserInfo: getUserInfo,
};
