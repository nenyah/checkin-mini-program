import { timeout } from "/config/api";
import { getStorageSync } from "/service/storage";
var app = getApp();

function request(options) {
  let token, headers;
  if (app.globalData.userInfo) {
    token = app.globalData.userInfo.token;
    headers = {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
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

function uploadFile(options) {
  let token, header;
  if (app.globalData.userInfo) {
    token = app.globalData.userInfo.token;
    header = {
      Authorization: token,
    };
  }
  return new Promise((resolve, reject) => {
    console.log("开始解析", options.url);

    my.uploadFile({
      url: options.url,
      fileType: "image",
      fileName: "file",
      filePath: options.filePath,
      formData: options.formData || {},
      header: header,
      success: (res) => {
        console.log("获取数据成功", res);
        if (!res) {
          reject({
            errCode: -1,
            errMsg: "网络问题",
            data: {},
          });
        } else {
          resolve(JSON.parse(res.data));
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
  uploadFile,
};
