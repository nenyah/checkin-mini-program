/*
 * @Description: 登录接口
 * @Author: Steven
 * @Date: 2020-04-21 17:09:09
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-24 13:31:06
 */

import { request } from "./network";
import { Userinfo } from "/config/api";
import util from "/util/utils";
async function login() {
  const { authCode } = await getAuthCode().catch((err) => console.error(err));
  const { token, user } = await request({
    url: Userinfo,
    data: {
      authCode: authCode,
    },
  }).catch((err) => console.error(err));
  // 储存用户信息、tolen
  getApp().globalData.userInfo = user;
  getApp().globalData.token = token;
  welcome(user.userName);
  getApp().emitter.emit("refresh", { type: "refresh" });
}

// 问候方法
function welcome(name) {
  let welcome = "";
  let time = new Date().getHours();
  if (time <= 11) welcome = "上午好";
  else if (time > 11 && time <= 13) welcome = "中午好";
  else if (time > 13 && time <= 17) welcome = "下午好";
  else if (time > 17) welcome = "晚上好";
  util.ddToast({
    type: "success",
    text: `亲爱的${name}，${welcome}`,
    interval: 1000,
  });
}
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

module.exports = {
  login,
};
