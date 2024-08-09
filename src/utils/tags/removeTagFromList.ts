import type { Tag } from "types";

export default function removeTagFromList (tags: Tag[], tagToRemove: undefined|null|string) {
    return tagToRemove != null
      ? tags.filter((t) => t !== tagToRemove)
      : tags.slice(0,-1);
  }