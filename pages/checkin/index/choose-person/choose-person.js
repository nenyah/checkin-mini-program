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
    } else {
      this.setData({
        isSelected: false,
      });
    }
  },
  didUnmount() {},
  methods: {
    handleTap() {
      my.navigateTo({
        url: "/pages/checkin/customer/customer",
      });
    },
  },
});
