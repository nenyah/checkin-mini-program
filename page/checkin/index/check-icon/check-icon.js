import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {},
  props: {
    visitsPerson: "",
    ctime: "00:00"
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
            this.props.visitsPerson
        });
      } else {
        my.alert({ title: "请选择拜访对象！" });
      }
    }
  }
});
