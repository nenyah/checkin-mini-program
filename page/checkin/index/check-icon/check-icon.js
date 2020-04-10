import { formatDate } from "/util/utils.js";
Component({
  mixins: [],
  data: {
  },
  props: {
    visitsPerson:"",
    ctime: "00:00"
  },
  didMount() {
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    goSubmit(){
      my.navigateTo({
        url: '../checkin-submit/checkin-submit?visitsPerson='+this.props.visitsPerson
      });
    }
  }
});
