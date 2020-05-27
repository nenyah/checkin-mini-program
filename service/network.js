import { timeout } from "/config/api";
import { getStorageSync } from "/service/storage";
let app = getApp();

function request(options) {
  let token, headers;
  if (app.globalData.userInfo) {
    token = app.globalData.userInfo.token;
    options.headers = options.headers || {};
    Object.assign(options.headers, { Authorization: token });
  }

  return new Promise((resolve, reject) => {
    console.log("开始解析", options.url);

    my.httpRequest({
      ...options,
      success: (res) => {
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
      complete: (res) => {
      },
    });
  });
}

function uploadFile(options) {
  let token, header;
  if (app.globalData.userInfo) {
    token = app.globalData.userInfo.token;
    header = {
      // "content-type": "multipart/form-data",
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
