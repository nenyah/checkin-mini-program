import us from "lodash/core";

function getStorage(key) {
  return new Promise((resolve, reject) => {
    my.getStorage({
      key: key,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: (res) => {},
    });
  });
}
function getStorageSync(key) {
  return my.getStorageSync({ key });
}

function setStorage(option) {
  let key = option.key;
  let data = option.data;

  return new Promise((resolve, reject) => {
    my.setStorage({
      key: key,
      data: data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: (res) => {},
    });
  });
}
function setStorageSync(option) {
  return my.setStorageSync({
    key: option.key,
    data: option.data,
  });
}
module.exports = {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
};
