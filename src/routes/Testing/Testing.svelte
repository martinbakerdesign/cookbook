<script>
  import parseIngredient from "utils/text/parseIngredient";

  let value, parsed;
  $: parsed = parseIngredient(value);
</script>

<main>
  <input type="text" bind:value /> = {`{`}
  {`quantity: ${parsed?.quantity},`}
  {`unit: ${parsed?.unit},`}
  {`ingredient: ${parsed?.ingredient}`}
  {`}`}
</main>

<style lang="scss"></style>
