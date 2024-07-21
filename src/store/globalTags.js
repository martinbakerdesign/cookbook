import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "firestore/";
import { get, writable } from "svelte/store";
import removeEmojis from "utils/text/removeEmojis";
import uFuzzy from "@leeoniya/ufuzzy";

export default function globalTagsStore(init = []) {
  const globalTags = writable(init);
  const { update, set, subscribe } = globalTags;

  async function hydrate() {
    try {
      let tags = [];
      await getDocs(collection(db, "recipes")).then((snapshot) => {
        snapshot.forEach(async (doc) => {
          let recipe = await doc.data();
          tags = [...tags, ...recipe.tags];
        });
      });

      const newTags = [...new Set(tags)];

      set(newTags);
    } catch (err) {
      throw err;
      console.error(err);
    }
  }

  async function add(tag) {
    try {
      // console.log("adding tag: ", tag);
      if (!!get(globalTags).filter((t) => t === tag).length) return;

      console.log("adding tag");
      // let newTag = await addDoc(collection(db, "tags"), { name: tag });
      update((ts) => [...ts, tag]);
    } catch (err) {
      console.error(err);
    }
  }

  async function remove(tag) {
    try {
      console.log("removing tag: ", tag);
      if (get(globalTags).filter((t) => t.name === tag).length) return;
      await addDoc(collection(db, "tags"), { name: tag });
      update((ts) => [...ts, { name: tag }]);
    } catch (err) {
      console.error(err);
    }
  }

  function exists(query = "") {
    return get(globalTags).filter((tag) =>
      tag.toLowerCase().includes(query.toLowerCase())
    ).length;
  }

  function find(query = "") {
    const $tags = get(globalTags)

    const uf = new uFuzzy({
      intraMode: 1,
    });

    const idxs = uf.filter($tags, query);

    const results = $tags.filter((tag, i) => idxs.includes(i));

    const sortFn = getSortByMatchIndexFn(query)
    
    const sorted = results.sort(sortFn);
    
    return sorted;
  }
  function getSortByMatchIndexFn (query) {
    const getMatchIndex = getMatchIndexHelperFn(query);
    return (a, b) => {
      return getMatchIndex(a) - getMatchIndex(b)
    }
  }
  function getMatchIndexHelperFn(query) {
    return (result) => {
      return removeEmojis(result).toLowerCase().indexOf(query.toLowerCase())
    }
  }

  function findById(query = "") {
    if (!query || !query.length) return [];
    return get(globalTags).filter(({ id }) => id === query)[0];
  }

  hydrate();

  return {
    subscribe,
    hydrate,
    exists,
    add,
    find,
    findById,
  };
}
