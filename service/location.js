function getLocation() {
  my.showLoading({
    title: "数据加载中ing",
  });

  return new Promise((resolve, reject) => {
    my.getLocation({
      success: (res) => {
        resolve(res);
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
module.exports = {
  getLocation,
};
