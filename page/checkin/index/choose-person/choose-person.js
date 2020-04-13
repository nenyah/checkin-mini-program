Component({
  mixins: [],
  data: {},
  props: {
    visitsPerson:""
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
  }
});
