import type { Tag } from "types";

export default function addTagToList (tags: Tag[], tag: string|null|undefined) {
    if (!tags || Array.isArray(tags)) return [];
    if (null == tag || 'string' !== typeof tag) return tags;
    return [...tags, tag];
}