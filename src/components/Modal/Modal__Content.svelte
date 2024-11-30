<script></script>

<div class="rounded-2 backdrop-blur-md bg-background-surface shadow-xl w-full max-w-[94vw] lg:max-w-[36rem] flex flex-col gap-y-16 p-3 modal-content-container">
    <slot name="header"/>
    <slot/>
    <slot name="footer"/>
</div>

<style>
    .modal-content-container {
        max-height: calc(100% - 0.75rem);
    }
</style>