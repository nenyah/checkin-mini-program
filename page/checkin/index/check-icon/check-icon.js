import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {
    ctime: "00:00"
  },
  props: {
    visitsPerson:"",
  },
  didMount() {
    this.getTime();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getTime() {
      const date = new Date();
      const ctime = formatDate(date,'hh:mm');
      this.setData({
        ctime
      });
    },
    goSubmit(){
      my.navigateTo({
        url: '../checkin-submit/checkin-submit?visitsPerson='+this.props.visitsPerson
      });
    }
  }
});
