<script>
    import {Select} from 'bits-ui'
  import Icon from 'components/Icon';
</script>

<Select.Trigger
    class="flex items-center justify-center relative rounded-1 bg-background-fill-inverted hover:bg-background-fill-inverted-hover py-6 px-4 flex-1"
    on:click
    on:keydown
    {...$$restProps}
>
    <Select.Value class="text-text text-body-md font-medium tracking-normal" />
    <!--  icon  -->
    <span class="inline-flex absolute right-4 top-1/2 -translate-y-1/2 fill-icon" role="presentation">
        <Icon icon="chevron-up-down--12" size={12}/>
    </span>
</Select.Trigger>