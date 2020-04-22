Component({
  mixins: [],
  data: {
    isSelected: false,
  },
  props: {
    client: "",
  },
  didMount() {
    if (Object.keys(this.props.client)) {
      this.setData({
        isSelected: !this.data.isSelected,
      });
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap() {
      my.navigateTo({
        url: "/page/checkin/customer/customer",
      });
    },
  },
});
