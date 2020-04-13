App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    console.log("SDKVersion", dd.SDKVersion);
    my.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      },
      fail(err) {
        console.log(err);
      }
    });


    dd.setStorage({
      key: "checkInDate",
      data: {
        date: new Date()
      },
      success: function() {
        // console.log({ content: "写入成功" });
      }
    });
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  globalData: {
    userInfo: null,
    navHeight: 0,
    hasLogin: false
  }
});
