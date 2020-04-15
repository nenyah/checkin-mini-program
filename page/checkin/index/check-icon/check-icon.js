import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {},
  props: {
    visitsPerson: "",
    ctime: "00:00",
    checkTimes: 0,
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    goSubmit() {
      if (this.props.visitsPerson) {
        my.navigateTo({
          url:
            "../checkin-submit/checkin-submit?visitsPerson=" +
            this.props.visitsPerson,
        });
      } else {
        my.alert({ title: "还没有选择拜访对象哦！" });
      }
    },
  },
});
