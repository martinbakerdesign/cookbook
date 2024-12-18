import { get, writable } from 'svelte/store';
import { itemTypes } from 'components/ContextMenu';

import {id as deleteModalId} from 'routes/Menu/Modals/Delete'
import {id as renameModalId} from 'routes/Menu/Modals/Rename'
import {id as shareModalId} from 'routes/Menu/Modals/Share'

import ContextMenu from "./Menu__List__ContextMenu.svelte";
import Trigger from './Menu__List__ContextMenu__Trigger.svelte'
import Item from './Menu__List__ContextMenu__Item.svelte'

import { hideContextMenu } from 'store/contextMenu';
import { showModal } from 'store/modals';
import { recipes } from 'store/index';
import { recipeId } from 'routes/Menu/Modals';

const open = writable(false);
function toggleContextMenu ($open) {
  open.update(value => $open ?? !value)
}
function getTriggerClickHandler (id) {
  return (e) => {
    const target = e.target.closest('button');
    target.dispatchEvent(new MouseEvent('contextmenu', e));
    recipeId.set(id)
    toggleContextMenu(true)
  }
}

const items = [
  {
    label: "Share",
    icon: "share",
    onClick: openShareModal,
    type: itemTypes.ITEM,
  },
  {
    label: "Rename",
    icon: "rename",
    onClick: openRenameModal,
    type: itemTypes.ITEM,
  },
  {
    label: "Duplicate",
    icon: "copy",
    onClick: recipes.duplicate,
    type: itemTypes.ITEM,
  },
  {
    type: itemTypes.DIVIDER,
  },
  {
    label: "Delete",
    icon: "delete",
    onClick: openDeleteModal,
    type: itemTypes.ITEM,
  },
];

function openShareModal() {
  showModal(shareModalId)
  hideContextMenu.current && hideContextMenu.current();
}
function openRenameModal() {
  showModal(renameModalId)
  hideContextMenu.current && hideContextMenu.current();
}
function openDeleteModal() {
  showModal(deleteModalId)
  hideContextMenu.current && hideContextMenu.current();
}

export {
  ContextMenu as default,
  ContextMenu,
  Trigger,
  Item,
  //
  open,
  items,
  //
  getTriggerClickHandler,
  toggleContextMenu
}