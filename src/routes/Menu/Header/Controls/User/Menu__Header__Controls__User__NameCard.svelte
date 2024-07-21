<script>
  import user from "store/user";
</script>

<div class="namecard">
  <div class="namecard__thumb">
    <img src={$user.thumb} alt={$user.name} />
  </div>
  <div class="namecard__name">{$user.name}</div>
</div>

<style lang="scss">
  @use "../../../../../styles/colours" as c;
  @use "../../../../../styles/sizes" as s;
  @use "../../../../../styles/typo" as t;

  .namecard {
    padding: s.$s4 s.$s3 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: s.$s5;

    &__thumb {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: s.$s2;

      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
        background-color: c.$accent;
      }
    }
    &__name {
      font-weight: 600;
      font-size: 0.875rem;
      letter-spacing: 0;
      line-height: 1.25em;
      letter-spacing: calc(0.1 / 14 * 1em);
    }
  }
</style>
