import Button from './Nav--Recipe__RecipesButton.svelte'
import { push } from "svelte-spa-router";
  import handleLinkClick from "utils/router/handleLinkClick";

  const iconProps = {
      icon:"home--20",
      size: 20,
      label: 'Recipes'
  }

  const onClick = handleLinkClick(() => {
        push('/')
    })

export {
    Button as default,
    //
    iconProps,
    //
    onClick
}