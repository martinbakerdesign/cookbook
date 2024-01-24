class ToolbarGroup {
  constructor(items = [], id = null, className = null) {
    if (!items || !items.length) return;

    this.items = items;
  }
  update = function (state, dispatch) {
    for (let item of this.items) {
      item?.update && item.update(state, dispatch);
    }
  };
  onClick = function (e, state, dispatch) {
    for (let item of this.items) {
      item?.command &&
        (e.target === item.dom || item.dom.contains(e.target)) &&
        (item.passEvent
          ? item.command(e, state, dispatch)
          : item.command(state, dispatch));
    }
  };
}

export default ToolbarGroup;
