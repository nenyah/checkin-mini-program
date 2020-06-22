import { urlEncode } from "/util/utils";
let app = getApp();
Component({
  mixins: [],
  data: {},
  props: {
    client: "",
    ctime: "00:00",
    checkTimes: 0,
    onSubmit: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    goSubmit() {
      this.props.onSubmit()
      // const selectuserInfo = app.globalData.userInfo;
      
      // // 判断是否获取用户信息成功
      // if (selectuserInfo === null) {
      //   my.showToast({
      //     type: "fail",
      //     content: "请稍等，用户信息还没有获取成功！",
      //     duration: 2000,
      //   });
      // } else {
      //   // 已经有用户信息了
      //   if (!selectuserInfo.user.selectOrg) {
      //     // 判断是否需要选择拜访对象
      //     // 不用选择
      //     my.navigateTo({
      //       url: "../checkin-submit/checkin-submit",
      //     });
      //   } else {
      //     // 需要选择
      //     if (!this.props.client) {
      //       // 没有拜访对象
      //       my.showToast({
      //         type: "fail",
      //         content: "还没有选择拜访对象哦！",
      //         duration: 2000,
      //       });
      //     } else {
      //       // 有拜访对象
      //       my.navigateTo({
      //         url:
      //           "../checkin-submit/checkin-submit?" +
      //           urlEncode(this.props.client),
      //       });
      //     }
      //   }
      // }
    },
    goTest() {
      my.navigateTo({
        url: "/pages/test/test",
      });
    },
  },
});
