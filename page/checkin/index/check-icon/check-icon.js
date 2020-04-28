import { urlEncode } from "/util/utils";
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
      if (this.props.client) {
        my.navigateTo({
          url:
            "../checkin-submit/checkin-submit?" + urlEncode(this.props.client),
        });
      } else {
        my.showToast({
          type: "fail",
          content: "还没有选择拜访对象哦！",
          duration: 2000,
        });
      }
    },
    goTest(){
      my.navigateTo({
        url:'/page/test/test'
      })
    },
  },
});
