type ObjectValues<T> = T[keyof typeof T];

const NODE_TYPES = {
  HEADER: "HEADER",
  INGREDIENT: "INGREDIENT",
  MISE_EN_PLACE: "MISE_EN_PLACE",
  STEP: "STEP",
  NOTE: "NOTE",
} as const;
type NODES = ObjectValues<NODE_TYPES>;

global {
    type RecipeID = string & {__brand: 'recipe_id'}
    type RecipeTitle = string & {__brand: 'recipe_title'}
    type RecipeAuthor = string & {__brand: 'recipe_author'}
    type RecipeDescription = string & {__brand: 'recipe_description'}
    type RecipeSrc = string & {__brand: 'recipe_src'}
    type Text = string & {__brand: 'text'}
    type Note = string & {__brand: 'note'}
    type Created = { seconds: number, nanoseconds: number }

    type Ingredient = {
        type: NODES.HEADER|NODES.INGREDIENT,
        text: Text,
    }
    type Step = {
        type: NODES.HEADER|NODES.STEP,
        text: Text,
    }
    type MiseEnPlace = {
        type: NODES.HEADER|NODES.MISE_EN_PLACE,
        text: Text
    }
    type Note = {
        type: NODES.NOTE,
        text: Text
    }
    type Tag = string & {__brand: 'tag'}

    type Recipe = {
        id: RecipeID,
        title: RecipeTitle,
        amount: { text: "", quantity: 0, unit: "" },
        duration: { text: "", quantity: 0, unit: "" },
        author: RecipeAuthor,
        src: RecipeSrc,
        description: RecipeDescription,
        shared: boolean,
        created: Created,
        ingredients: Ingredient[],
        method: Step[],
        mise_en_place: MiseEnPlace[],
        notes: Note[],
        tags: Tag[],
    }
}

export {
    type NODES,
    type Recipe,
    type Ingredient,
    type MiseEnPlace,
    type Step,
    type Note,
    type Tag,
    //
    INGREDIENT_TYPES,
}