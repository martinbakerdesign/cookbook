import recipeSchema, { NODE_OPTIONS, NODES } from "schemas/recipe";
import {options, refs, setValue} from 'routes/Recipe/EditorBar/BlockTypeSwitch';
import { CHILD_NODES, PARENT_NODES } from "schemas/recipe";
import { get } from "svelte/store";
import { canEdit } from "store/recipe";

class BlockTypeSelector {
  constructor() {
    this.view = null;

    this.dom = null;

    this.passEvent = true;

    this.typeOptions = [];

    this.parentNodeType = null;
    this.childNodeType = null;

    this.hasInit = false;
  }
  // init
  init = (view) => {
    this.hasInit = true;
    this.dom = refs.outer;
    this.view = view;
  }
  //
  /**
   * Fired when the switch is clicked
   * @param {*} event 
   * @param {*} state 
   * @param {*} dispatch 
   */
  command = (event, state, dispatch) => {
    !this.hasInit && this.init();
    if (!get(canEdit)) return;

    const newType = event.target.closest('label').querySelector('input')?.value;
    this.setBlockType(newType, state, dispatch);
  }
  /**
   * Runs every time the editor is updated
   */
  update = () => {
    !this.hasInit && this.init();

    if (!get(canEdit)) return;

    const prevParentNodeType = this.parentNodeType;
    const prevChildNodeType = this.childNodeType;

    this.parentNodeType = this.getParentNodeType(this.view.state);
    this.childNodeType = this.getChildNodeType(this.view.state, this.parentNodeType);

    const parentChanged = prevParentNodeType !== this.parentNodeType
    const childChanged = prevChildNodeType !== this.childNodeType;

    if (!parentChanged && !childChanged) return;

    parentChanged && this.updateOptions();
    childChanged && this.updateCurrent()
  }
  // View State Getters
  /**
   * Determine which section of the recipe the editor is in
   * @param {*} state 
   * @returns {typeof NODES[keyof typeof NODES]} Parent node type
   */
  getParentNodeType = (state) => {
    const {
      selection: { empty, from, to },
    } = state;

    const tree = [];

    state.doc.descendants((node, pos) => {
      if (!PARENT_NODES.includes(node.type.name)) return;
      const end = pos + node.content.size + 1;
      if (end < from || pos > to) return;
      tree.push(node.type.name)
    });

    return tree.length > 1 || !tree.length ? null : tree.pop();

    const editorFocus = empty
      ? from < methodStart
        ? "ingredients"
        : "method"
      : to < methodStart
      ? "ingredients"
      : "method";

    return editorFocus;
  }
  getChildNodeType(state, parentNodeType) {
    const {
      selection: { empty, from, to },
    } = state;

    const tree = [];

    let isChildOfParent = false;

    state.doc.descendants((node, pos) => {
      if (PARENT_NODES.includes(node.type.name)) {
        isChildOfParent = !parentNodeType || node.type.name === parentNodeType;
        return;
      }
      if (!CHILD_NODES.includes(node.type.name) || !isChildOfParent) return;
      const end = pos + node.content.size + 1;
      if (end < from || pos > to) return;
      tree.push(node.type.name)
    });

    return tree.pop()
  }
  // Markup
  setBlockType = (
    type,
    state = this.view.state,
    dispatch = this.view.dispatch
  ) => {
    const newType = recipeSchema.nodes[type];
    if (!newType) return;
    
    const { from, to } = state.selection;
    const transaction = state.tr.setBlockType(from, to, newType).scrollIntoView();

    dispatch(transaction);
  }
  updateOptions = () => {
    options.set(NODE_OPTIONS[this.parentNodeType] ?? []);
  }
  updateCurrent = () => {
    setValue(this.childNodeType);
  }
  destroy = () => {}
}

const blockTypeSelector = new BlockTypeSelector();

export {
  blockTypeSelector as default
}
