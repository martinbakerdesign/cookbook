import capitalise from "utils/text/capitalise";

export function getUnitGrouping (
  allUnits: Unit[],
  groupBy: 'type'|'system',
  MATCH_TO: (UnitType|UnitSystem)[]
) {
  let units: UnitGrouping = {};
  let output: UnitGrouping = {}
  let abbrevs, plural, unit: Unit;

  for (let u = 0; u < allUnits.length; u++) {
    unit = allUnits[u];
    
    if (!unit) continue;

    abbrevs = unit.abbrev;
    plural = unit.plural;

    MATCH_TO.includes(unit[groupBy]) &&
      ((output[unit.title] = unit),
      (output[unit.title.toLowerCase()] = unit),
      plural && ((output[plural] = unit),
      (output[capitalise(plural)] = unit)));
    abbrevs.forEach(
      (a) => (
        (units[a] = unit),
        MATCH_TO.includes(unit[groupBy]) && (output[a] = unit)
      )
    );
  }

  return output;
}