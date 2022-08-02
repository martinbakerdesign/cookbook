export default function replaceUnicodeFractions(src) {
  return src
    .replace(/½/g, "1/2")
    .replace(/⅓/g, "1/3")
    .replace(/⅕/g, "1/5")
    .replace(/⅙/g, "1/6")
    .replace(/⅛/g, "1/8")
    .replace(/⅔/g, "2/3")
    .replace(/⅖/g, "2/5")
    .replace(/⅚/g, "5/6")
    .replace(/⅜/g, "3/8")
    .replace(/¾/g, "3/4")
    .replace(/⅗/g, "3/5")
    .replace(/⅝/g, "5/8")
    .replace(/⅞/g, "7/8")
    .replace(/⅘/g, "4/5")
    .replace(/¼/g, "1/4")
    .replace(/⅐/g, "1/7")
    .replace(/⅑/g, "1/9")
    .replace(/⅒/g, "1/10")
    .replace(/↉/g, "0/3");
}
