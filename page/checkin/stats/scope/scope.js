import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {
    today: "2020-04-01"
  },
  props: {},
  didMount() {
    const date = new Date();
    const today = formatDate(date, "-");
    this.setData({
      today
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    chooseDate() {
      dd.datePicker({
        format: "yyyy-MM-dd",
        currentDate: this.data.today,
        success: res => {
          dd.alert({
            content: res.date
          });
        }
      });
    }
  }
});
