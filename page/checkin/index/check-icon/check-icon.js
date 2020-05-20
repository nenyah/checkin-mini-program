import { urlEncode } from "/util/utils";
var app = getApp();
Component({
  mixins: [],
  data: {},
  props: {
    client: "",
    ctime: "00:00",
    checkTimes: 0,
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    goSubmit() {
      // const selectOrg = app.globalData.userInfo.user.selectOrg;
      const selectOrg = false;
      if (selectOrg) {
        if (this.props.client) {
          my.navigateTo({
            url:
              "../checkin-submit/checkin-submit?" +
              urlEncode(this.props.client),
          });
        } else {
          my.showToast({
            type: "fail",
            content: "还没有选择拜访对象哦！",
            duration: 2000,
          });
        }
      } else {
        my.navigateTo({
          url:
            "../checkin-submit/checkin-submit?" + urlEncode(this.props.client),
        });
      }
    },
    goTest() {
      my.navigateTo({
        url: "/page/test/test",
      });
    },
  },
});
