import Item from "./Menu__List__Item.svelte";
import Tags from "./Menu__List__Item__Tags.svelte";
import ContextMenuTouchToggle from "./Menu__List__Item__Touch__ContextMenuTouchToggle.svelte";
import ContextMenu from "./ContextMenu";
import { get, writable } from "svelte/store";
import { hideContextMenu } from "store/contextMenu";
import dateToRecencyString from "utils/date/dateToRecencyString";
import timestampToDate from "utils/db/timestamp/timestampToDate";

function useContextMenu() {
  const showContextMenu = writable(false);
  const contextPos = writable([0, 0]);

  let ref;

  function builder(el) {
    ref = el;

    ref.addEventListener("contextmenu", openContextMenu);
  }
  function hideContext() {
    showContextMenu.set(false);
    hideContextMenu.current = null;
  }
  function onClickOut(e) {
    if (ref && ref.contains(e.target)) return;
    window.removeEventListener("click", onClickOut);
    get(showContextMenu) && hideContext();
  }
  function openContextMenu (e) {
    e.preventDefault();
    window.removeEventListener('click', onClickOut)
    if (!ref) return;
    hideContextMenu?.current && hideContextMenu.current()
    window.addEventListener('click', onClickOut)
    contextPos.set(getClickPos(ref,e))
    showContextMenu.set(true)
    hideContextMenu.current = hideContext;
  }
  function init() {
    return () => {
      window.removeEventListener("click", onClickOut);
      ref && ref.removeEventListener("contextmenu", openContextMenu);
    };
  }

  return {
    showContextMenu,
    contextPos,
    //
    init,
    builder,
    hideContext,
    openContextMenu
  };
}

function getTimeSince ($sortKey, created, last_edited) {
  return dateToRecencyString(
        timestampToDate($sortKey, created, last_edited)
      )
}
function getClickPos (ref,e) {
  if (!ref) return [0,0]
  const rect = ref.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top
  return [x,y];
}

export {
  Item as default,
  Item,
  Tags,
  ContextMenu,
  ContextMenuTouchToggle,
  //
  useContextMenu,
  getTimeSince,
};
