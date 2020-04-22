import { urlEncode } from "/util/utils.js";
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
        my.alert({ title: "还没有选择拜访对象哦！" });
      }
    },
  },
});
