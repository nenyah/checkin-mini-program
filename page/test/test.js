import { watermark } from "/util/watermark";
import { getUserInfo } from "/service/login";
import { getRecord } from "/service/record";
import {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
} from "/service/storage";
var app = getApp();
Page({
  data: {},
  async onLoad(options) {
    // await this.test();
  },
  async test() {
    // getRecord({ userIds: ['NB1685','NB0571'] })
    //   .then((res) => {
    //     console.log("获取选择人员签到信息", res);
    //   })
    //   .catch((err) => console.error(err));

    my.chooseImage({
      sourceType: ["camera"],
      success: (res) => {
        dd.alert({
          title: "选中的图片",
          content: JSON.stringify(res.filePaths),
        });
        let org = {};
        console.log(app.globalData.userInfo.token);

        dd.uploadFile({
          url: "http://192.168.10.115:9102/ding/signin/uploadImg",
          fileType: "image",
          fileName: "filename",
          filePath: res.filePaths[0],
          header: {
            Authorization: app.globalData.userInfo.token,
          },
          formData: {
            detailPlace: "detailPlace",
            // latitude: "69.96",
            // longitude: "120.12",
            // // org: {
            // //   myid: '132465',
            // //   name: "上山打老虎",
            // // },
            // place: "测试地址",
            // remark: "测试备注",
            // timeStamp: 180596231,
          },
          success: (res) => {
            console.log("上传返回信息", res);

            dd.alert({
              content: "上传成功",
            });
          },
          fail: (err) => {
            console.error(err);
          },
        });
      },
    });

    // dd.downloadFile({
    //   url: "http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg",
    //   success({ filePath }) {
    //     dd.previewImage({
    //       urls: [filePath],
    //     });
    //   },
    //   fail(res) {
    //     dd.alert({
    //       content: res.errorMessage || res.error,
    //     });
    //   },
    // });
  },
  uploadFile() {
    my.chooseImage({
      chooseImage: 1,
      success: (res) => {
        const path = res.apFilePaths[0];
        console.log(path);
        my.uploadFile({
          url: "http://httpbin.org/post",
          fileType: "image",
          fileName: "file",
          filePath: path,
          success: (res) => {
            my.alert({ title: "上传成功" });
          },
          fail: function (res) {
            my.alert({ title: "上传失败" });
          },
        });
      },
    });
  },
});
