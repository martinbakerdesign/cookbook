import {refs} from 'store/recipe'

class DegreesButton {
  constructor() {
    this.command = this.addSymbol.bind(this);
  }
  init = function (view) {
    this.dom = refs.editorActions.degrees
    // $("#recipe__header__toolbar__undo");
    this.view = view;
  }
  addSymbol = function (state, dispatch) {
    const {tr, selection: {from, to}} = state;

    tr.insertText('°', from, from)
    dispatch(tr)

    return true;
  }
  getDom = () => {
    return refs.editorActions?.degrees ?? null;
  }
}

const degreesButton = new DegreesButton();

export default degreesButton;
