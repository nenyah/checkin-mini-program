Component({
  mixins: [],
  data: {},
  props: {
    onGetvalue: data => {
      console.log(data);
    }
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap() {
      my.navigateTo({
        url: "/page/checkin/customer/customer"
      });
    },
    getInput(e) {
      console.log('input',e);
      const value = e.detail.value;
      this.props.onGetvalue(value);
    },
  }
});
