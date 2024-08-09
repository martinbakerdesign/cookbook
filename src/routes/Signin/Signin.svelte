<script>
  import { authProviders, Button, Window } from '.'

  import "./Button/Signin__Button.scss";
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>

<div class="w-screen h-screen pt-safe-area-inset-top">
  <article id="signin" class="flex flex-col gap-0 p-page w-full h-full lg:flex-row lg:gap-10">
  
    <Window />
  
    <main id="signin__form" class="flex-1 pb-6 flex flex-col justify-center">
      <div class="w-full mx-auto lg:max-w-[19.25rem] space-y-16 lg:space-y-26">
        <h2 id="signin__form__heading" class="text-heading-2xl">Sign in</h2>
        <div class="providers space-y-2">
          {#each authProviders as props}
            <Button {...props} />
          {/each}
        </div>
      </div>
    </main>
    
  </article>
</div>
