import { timeout, Adminuserpermission } from "/config/api.js";

function request(options) {
  dd.showLoading({
    title: "数据加载中ing",
  });

  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: options.url,
      timeout: timeout,
      method: options.method || "GET",
      data: options.data || {},
      headers: options.headers,
      success: (res) => {
        console.log("network success");
        console.log(res);
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
        dd.hideLoading();
      },
    });
  });
}

export default request;
