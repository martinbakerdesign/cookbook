import { get } from "svelte/store";
import { isUserAuthor } from "store/";
import keymapping from "./keymapping";
import { history } from "prosemirror-history";
import highlightDecorations from "./highlightDecorations";
import placeholder from "./placeholder";
// import highlightMethodDecorations from "./method/highlightDecorations";
import translateUnit from "./ingredient/translateUnit";
// import toggleIngredientHeader from "./ingredient/toggleHeader";
// import toggleMethodHeader from "./method/toggleHeader";
// import drag from "./drag";
// import historyGroup from "./toolbar/historyGroup";
// import divider from "./toolbar/divider";
import toolbarPlugin from "./toolbar";
import blockTypeSelector from "./toolbar/blockType";
import undoButton from "./toolbar/undoButton";
import redoButton from "./toolbar/redoButton";
import unitSelector from "./toolbar/unitSelector";
// import contextMenuPlugin from "./contextMenu";
// import { getContextItemButton, toggleBlockType } from "./toggleHeader";
// import ingredientsSchema from "schemas/ingredient";
// import methodSchema from "schemas/method";

function plugins() {
  let isAuthor = get(isUserAuthor);

  return isAuthor
    ? [
        keymapping,
        placeholder,
        toolbarPlugin([
          undoButton,
          redoButton,
          blockTypeSelector,
          unitSelector,
        ]),
        // contextMenuPlugin(
        //   [
        //     {
        //       command: toggleBlockType([
        //         ingredientsSchema.nodes.ingredient,
        //         ingredientsSchema.nodes.header,
        //       ]),
        //       dom: getContextItemButton(
        //         "toggleheader",
        //         "Header",
        //         "ingredients__context__tool--headertoggle",
        //         "context__tool context__tool--headertoggle"
        //       ),
        //       name: "Header",
        //     },
        //   ],
        //   "context__menu--ingredients",
        //   "context__menu--ingredients"
        // ),
        // translateUnit(),
        highlightDecorations,
        // drag,
        history(),
      ]
    : [
        // highlightIngredientDecorations
      ];

  // return {
  //   ingredients: isAuthor
  //     ? [
  //         keymapping,
  //         contextMenuPlugin(
  //           [
  //             {
  //               command: toggleBlockType([
  //                 ingredientsSchema.nodes.ingredient,
  //                 ingredientsSchema.nodes.header,
  //               ]),
  //               dom: getContextItemButton(
  //                 "toggleheader",
  //                 "Header",
  //                 "ingredients__context__tool--headertoggle",
  //                 "context__tool context__tool--headertoggle"
  //               ),
  //               name: "Header",
  //             },
  //           ],
  //           "context__menu--ingredients",
  //           "context__menu--ingredients"
  //         ),
  //         translateUnit(),
  //         highlightIngredientDecorations,
  //         drag,
  //         history(),
  //       ]
  //     : [highlightIngredientDecorations],
  //   method: isAuthor
  //     ? [
  //         keymapping,
  //         contextMenuPlugin(
  //           [
  //             {
  //               command: toggleBlockType([
  //                 methodSchema.nodes.step,
  //                 methodSchema.nodes.header,
  //               ]),
  //               dom: getContextItemButton(
  //                 "toggleheader",
  //                 "Header",
  //                 "method__context__tool--headertoggle",
  //                 "context__tool  context__tool--headertoggle"
  //               ),
  //               name: "Header",
  //             },
  //           ],
  //           "context__menu--method",
  //           "context__menu--method"
  //         ),
  //         // highlightMethodDecorations,
  //         drag,
  //         history(),
  //       ]
  //     : [
  //         // highlightMethodDecorations
  //       ],
  // };
}

export default plugins;
