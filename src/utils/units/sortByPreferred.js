import { UNITSYSTEM_METRIC } from "data/units/_types";

export default function sortByPreferred(units, preferred = UNITSYSTEM_METRIC) {
  let sorted = [...units].sort((a, b) =>
    a.system === preferred
      ? b.system !== preferred
        ? -1
        : 0
      : b.system === preferred
      ? 1
      : 0
  );

  return sorted;
}
