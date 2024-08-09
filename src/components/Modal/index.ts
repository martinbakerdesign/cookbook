import { get, writable } from "svelte/store";
import $ from 'utils/dom/querySelector'

import Modal from "./Modal.svelte";
import Title from "./Modal__Title.svelte";
import Content from "./Modal__Content.svelte";
import Actions from "./Modal__Actions.svelte";

import { registerModal } from "store/modals";

type Focusable = HTMLInputElement | HTMLTextAreaElement;

function useModal (id) {
  const refs = {
    modal: null,
    bg: null,
  };

  const show = writable(false);
  id && registerModal(id, show);

  let autofocus = false;

  function toggleAutofocus($autofocus) {
    autofocus = $autofocus;
  }
  function toggleModal(s = false) {
    const $show = s ?? !get(show);
    show.set($show);
  }
  function setAttributes(el: HTMLElement) {
    if (!el.children || !el.children.length) return;
  
    const firstChild = el.children[0];
    firstChild.setAttribute("role", "dialog");
    firstChild.setAttribute("tabindex", "-1");
  
    const input = $(el, 'input, textarea') as Focusable;
    if (!input) return;
  
    input.autofocus = autofocus;
    // if (!autofocus) return;
    // input.focus();
  }
  function onKeyDown(e) {
    const $show = get(show);
  
    if (!$show || e.key !== "Escape" || e.target.closest("button.input__option"))
      return;
  
    e.preventDefault();
    window.event.preventDefault();
    toggleModal(false);
  }
  function onClickOut(e) {
    const inModal = refs.modal && (refs.modal.contains(e.target) || refs.modal === e.target);

    if (inModal) return;
  
    toggleModal(false);
  }
  function builder (el) {
    refs.modal = el.children[0];
    setAttributes(el)
  }
  function init () {
    const unsub = show.subscribe(($show) => {
      window.removeEventListener('keydown', onKeyDown)
      if (!$show) return;
      window.addEventListener('keydown', onKeyDown)
    })
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unsub();
      // window.removeEventListener("click", onClickOut);
    }
  }

  return {
    refs,
    //
    show,
    //
    toggleAutofocus,
    toggleModal,
    onKeyDown,
    onClickOut,
    builder,
    init
  }
}

export {
  Modal as default,
  Modal,
  Title,
  Content,
  Actions,
  //
  type Focusable,
  //
  useModal,
}