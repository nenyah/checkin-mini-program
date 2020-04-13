App({
  onLaunch(options) {
    console.log("App Launch", options);
    console.log("getSystemInfoSync", dd.getSystemInfoSync());
    my.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      },
      fail(err) {
        console.log(err);
      }
    });
    console.log("SDKVersion", dd.SDKVersion);
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
