function getStorage(key) {
  dd.showLoading({
    title: "数据加载中ing",
  });

  return new Promise((resolve, reject) => {
    dd.getStorage({
      key: key,
      success: (res) => {
        resolve(res);
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
module.exports = {
  getStorage,
};
