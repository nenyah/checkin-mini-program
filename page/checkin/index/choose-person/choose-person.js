Component({
  mixins: [],
  data: {
    isSelected: false,
  },
  props: {
    client: "",
  },
  didMount() {},
  didUpdate() {
    if (Object.keys(this.props.client).length) {
      this.setData({
        isSelected: true,
      });
    }
  },
  didUnmount() {},
  methods: {
    handleTap() {
      my.navigateTo({
        url: "/page/checkin/customer/customer",
      });
    },
  },
});
