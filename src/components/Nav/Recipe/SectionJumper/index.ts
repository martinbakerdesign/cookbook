import SectionJumper from "./Nav--Recipe__SectionJumper.svelte";
import Trigger from "./Nav--Recipe__SectionJumper__Trigger.svelte";
import Content from "./Nav--Recipe__SectionJumper__Content.svelte";
import Item from "./Nav--Recipe__SectionJumper__Item.svelte";
import { focusedSection, refs } from "store/recipe";
import useSelect from "utils/select/useSelect";
import $ from "utils/dom/querySelector";
import { derived, get } from "svelte/store";
import { navHeight, toolbarHeight } from "store/index";

const onScreen = new Map();
const offScreen = new Map();
const sections = new Map();

const onIntersect = (entries) => {
  const $navHeight = get(navHeight) * 2;
  const $toolbarHeight = get(toolbarHeight);

  for (const entry of entries) {
    const { top, bottom } = entry.boundingClientRect;
    const isOnScreen =
      entry.isIntersecting &&
      bottom >= $navHeight &&
      top < window.innerHeight - $toolbarHeight;

    if (isOnScreen) {
      onScreen.set(entry.target, entry);
      offScreen.delete(entry.target);
    } else {
      offScreen.set(entry.target, entry);
      onScreen.delete(entry.target);
    }
  }

  const mostOnScreen = Array.from(onScreen.values())
    .sort((a, b) =>
      a.boundingClientRect.top < b.boundingClientRect.top ? -1 : 1
    )
    .sort((a, b) => (a.intersectionRatio > b.intersectionRatio ? -1 : 1));

//   console.log(
//     mostOnScreen.map((s) => ({
//       top: s.boundingClientRect.top,
//       ratio: s.intersectionRatio,
//       section: s.target.dataset.section,
//     }))
//   );

  if (!mostOnScreen.length) return;

  focusedSection.set(mostOnScreen[0].target.dataset.section);
};
const intersectionObserver = {
  current: new IntersectionObserver(onIntersect, {
    rootMargin: `-${get(navHeight)}px 0px -${get(toolbarHeight)}px`,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  }),
};

const elSizes = derived([navHeight, toolbarHeight], ([$nav, $toolbar]) => ({
  nav: $nav,
  toolbar: $toolbar,
}));

elSizes.subscribe(({ nav, toolbar }) => {
  intersectionObserver.current && intersectionObserver.current.disconnect();

  intersectionObserver.current = new IntersectionObserver(onIntersect, {
    rootMargin: `-${nav}px 0px -${toolbar}px`,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  Array.from(sections.values()).forEach((section) => {
    if (!document.body.contains(section)) return;
    intersectionObserver.current.observe(section);
  });
});

function observeSection(section) {
  if (!section || !intersectionObserver.current) return;
  sections.set(section.dataset.section, section);
  intersectionObserver.current.observe(section);
}

function onChangeCallback(e) {
  const section = refs.sections[e.value];
  if (!section) return;

  focusedSection.set(e.value);
  const sectionTop = getSectionTop(section);
  const navHeight = getNavHeight();

  window.scrollTo({
    top: sectionTop - navHeight,
    left: 0,
    behavior: "smooth",
  });
}
function getSectionTop(el) {
  const top = el.getBoundingClientRect().top + window.scrollY;

  return top;
}
function getNavHeight() {
  return $("nav").offsetHeight ?? 0;
}

const { getSelected, getOnChangeCallback } = useSelect();

export {
  SectionJumper as default,
  Trigger,
  Content,
  Item,
  //
  focusedSection,
  //
  getSelected,
  onChangeCallback,
  getOnChangeCallback,
  observeSection,
};
