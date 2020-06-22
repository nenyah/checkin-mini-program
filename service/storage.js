/*
 * @Description: 缓存接口
 * @Author: Steven
 * @Date: 2020-04-14 11:15:36
 * @LastEditors: Steven
 * @LastEditTime: 2020-06-22 13:30:09
 */

/**
 *异步步获取缓存
 * @author steven
 * @param {string} key
 * @returns Promise
 */
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

/**
 *同步获取缓存
 *
 * @author Steven
 * @date 2020-06-22
 * @param {string} key
 * @returns object
 */
function getStorageSync(key) {
  return my.getStorageSync({ key });
}

/**
 *异步设置缓存
 *
 * @author Steven
 * @date 2020-06-22
 * @param {object}} option
 * @returns Promise
 */
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

/**
 *同步设置缓存
 *
 * @author Steven
 * @date 2020-06-22
 * @param {object} option
 */
function setStorageSync(option) {
  my.setStorageSync({
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
