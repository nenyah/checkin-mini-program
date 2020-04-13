function getStorage(opt) {
  dd.showLoading({
    title: "数据加载中ing"
  });

  return new Promise((resolve, reject) => {
    dd.getStorage({
      key: opt.key,
      success: res => {
        // console.log("get location success", res);
        resolve(res);
      },
      fail: err => {
        reject(err);
      },
      complete: res => {
        dd.hideLoading();
      }
    });
  });
}
module.exports = {
  getStorage
};
