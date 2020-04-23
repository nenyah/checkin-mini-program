import { timeout } from "/config/api.js";
import { getStorageSync } from "/service/storage.js";

function request(options) {
  let token, headers;
  if (getStorageSync("userinfo").data) {
    token = getStorageSync("userinfo").data.token;
    headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: token,
      ...options.headers,
    };
  } else {
    headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
      ...options.headers,
    };
  }
  return new Promise((resolve, reject) => {
    console.log("开始解析", options.url);

    my.httpRequest({
      url: options.url,
      timeout: timeout,
      method: options.method || "POST",
      data: options.data,
      headers: headers,
      success: (res) => {
        // console.log("获取数据成功", res);
        if (!res) {
          reject({
            errCode: -1,
            errMsg: "网络问题",
            data: {},
          });
        } else {
          resolve(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: (res) => {},
    });
  });
}
module.exports = {
  request,
};
