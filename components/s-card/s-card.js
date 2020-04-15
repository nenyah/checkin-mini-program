Component({
  mixins: [],
  data: {},
  props: {
    item: "",
    onClickCard: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    itemClick(e) {
      const item = e.target.dataset.item;
      this.props.onClickCard(item);
    },
  },
});
