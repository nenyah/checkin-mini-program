/*
 * @Description: 网络接口
 * @Author: Steven
 * @Date: 2020-04-23 17:04:48
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:33:27
 */

import util from "/util/utils";
let app = getApp();

/**
 *网络接口
 *
 * @author Steven
 * @date 2020-06-22
 * @param {object} options 网络参数
 * @returns Promise
 */
function request(options) {
  return new Promise((resolve, reject) => {
    console.log("开始解析", options.url);

    my.httpRequest({
      ...options,
      headers: {
        ...options.headers,
        Authorization: getApp().globalData.token || undefined,
      },
      success: (res) => resolve(res.data),
      fail: (err) => {
        reject(err);
        handleError(err);
      },
    });
  });
}

/**
 *上传文件
 *
 * @author Steven
 * @date 2020-06-22
 * @param {object} options 内容参数
 * @returns Promise
 */
function uploadFile(options) {
  return new Promise((resolve, reject) => {
    console.log("开始解析", options.url);

    my.uploadFile({
      url: options.url,
      fileType: "image",
      fileName: "file",
      filePath: options.filePath,
      formData: options.formData || {},
      header: { Authorization: getApp().globalData.token || undefined },
      success: (res) => resolve(JSON.parse(res.data)),
      fail: (err) => {
        reject(err);
        handleError(err);
      },
      complete: (res) => {},
    });
  });
}

/**
 *错误处理方法
 *
 * @author Steven
 * @date 2020-06-22
 * @param {object} err
 */
function handleError(err) {
  let message = "请求错误";
  if (err.error) {
    // 判断错误码
    switch (err.error) {
      case 11:
        message = "无权跨域";
        break;
      case 12:
        message = "网络出错";
        break;
      case 13:
        message = "超时";
        break;
      case 14:
        message = "解码失败";
        break;
      case 19:
        message = "HTTP错误";
        break;
      default:
        break;
    }
  }
  util.ddToast({ type: "fail", text: message });
  console.error(err);
}
module.exports = {
  request,
  uploadFile,
};
