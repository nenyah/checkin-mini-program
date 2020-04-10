import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    const date = new Date();
    const today = formatDate(date,'YY年MM月DD日');
    this.setData({
      today
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {}
});
