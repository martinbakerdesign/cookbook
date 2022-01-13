import menu from "../Ingredients/ContextMenu";
import highlightQuantity from "../Ingredients/highlightQuantity";
import keymapping from "./keymapping";
import { history } from "prosemirror-history";

const plugins = {
  ingredients: [keymapping, menu, highlightQuantity, history()],
  method: [keymapping, history()],
};

export default plugins;
