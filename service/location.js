function getLocation() {
  dd.showLoading({
    title: "数据加载中ing"
  });

  return new Promise((resolve, reject) => {
    dd.getLocation({
      success: res => {
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
  getLocation
};
