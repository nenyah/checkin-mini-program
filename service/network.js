import { timeout } from "/config/api.js";

export default function request(options) {
  my.showLoading({
    title: "数据加载中ing",
  });

  return new Promise((resolve, reject) => {
    my.httpRequest({
      url: options.url,
      timeout: timeout,
      method: options.method || "GET",
      data: options.data || {},
      headers: options.headers,
      success: (res) => {
        console.log("获取数据成功", res);
        if (!res || res.status != 200) {
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
        my.hideLoading();
      },
    });
  });
}
