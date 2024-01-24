export const INGREDIENT_TYPES = {
  HEADER: "INGREDIENTS__HEADER",
  INGREDIENT: "INGREDIENTS__INGREDIENT",
};

const Header = {
  type: INGREDIENT_TYPES.HEADER,
  text: "Spicy Miso Tare",
};
const Ingredient = {
  type: INGREDIENT_TYPES.INGREDIENT,
  text: "200grams rice",
  amount: 200,
  unit: "g",
  ingredient: "rice",
};
const Ingredients = [
  {
    type: INGREDIENT_TYPES.HEADER,
    text: "Spicy Miso Tare",
  },
  {
    type: INGREDIENT_TYPES.INGREDIENT,
    text: "Miso",
  },
];

// [
//   {
//     _type, // HEADER OR INGREDIENT
//     _text, // str
//     quanitity, // number
//     unit, // abbrev
//     ingredient, // str
//   },
// ];
