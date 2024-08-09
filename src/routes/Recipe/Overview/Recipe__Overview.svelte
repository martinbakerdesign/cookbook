<script>
  import { observeSection } from "components/Nav/Recipe/SectionJumper";
  import { Title, Yield, Duration, Tags, URL } from ".";
  import { refs } from "store/recipe";
</script>

<section
  bind:this={refs.sections.OVERVIEW}
  data-section="OVERVIEW"
  use:observeSection
>
  <Title />
  <div class="border-b flex flex-wrap">
    <Yield />
    <Duration />
    <Tags />
  </div>
  <URL />
</section>
