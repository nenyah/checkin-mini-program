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
    itemClick(e){
      console.log('s-card组件里',e)
      const item = e.target.dataset.item
      this.props.onClickCard(item)
    }
  },
});
