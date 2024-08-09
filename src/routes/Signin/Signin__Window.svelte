<script>
    import { bg } from "store";
    import {Logo} from '.'

    $: bgPath = `/assets/img/landing/${$bg[0]}.webp`;
</script>

<div class="relative bg-center bg-no-repeat bg-cover flex-1 overflow-hidden rounded-xl rounded-10" style="background-image: url({bgPath})">
    <Logo />
</div>