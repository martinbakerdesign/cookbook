import removeDefaultFromPath from "./removeDefaultFromPath.js";

export default function getRefVarKey(value) {
    const fullPath = value.replace(/[{}]/g, "").split(".");
  
    return removeDefaultFromPath(fullPath).join("-");
  }