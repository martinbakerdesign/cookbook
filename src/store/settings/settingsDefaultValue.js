import { UNITSYSTEM_METRIC } from "data/units/_types";
import detectDarkMode from "utils/client/detectDarkMode";

const settingsDefaultValue = {
    units: {
      volumeUnits: UNITSYSTEM_METRIC,
      massUnits: UNITSYSTEM_METRIC,
      lengthUnits: UNITSYSTEM_METRIC,
      temperatureUnit: "°C",
    },
    fractions: "UNIT",
    theme: {
      dark: detectDarkMode(),
    },
  }

  export default settingsDefaultValue