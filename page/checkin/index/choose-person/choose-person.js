Component({
  mixins: [],
  data: {
    isSelected: false,
  },
  props: {
    client: "",
  },
  didMount() {
    
  },
  didUpdate() {
    console.log("选择客户组件", this.props.client);
    console.log("选择客户组件Keys", Object.keys(this.props.client));

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
