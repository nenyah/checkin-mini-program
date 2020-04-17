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
    console.log("获取用户信息", res, Userinfo);
    return request({
      url: Userinfo,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ res }),
    });
  });
}

function getUserInfo1() {
  my.getAuthCode({
    success: (res) => {
      return request({
        url: Userinfo,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ res }),
      });
    },
    fail: (err) => {
      console.error(err);
    },
  });
}
module.exports = {
  getUserInfo: getUserInfo1,
};
