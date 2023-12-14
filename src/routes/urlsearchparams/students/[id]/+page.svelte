<script lang="ts">
        import { page } from '$app/stores'
    export let data;

    $: ({ url } = $page)
</script>
{url.origin}
<br>
{url.hostname}
<br>
{url.pathname}
  
<div class="px-4">
    <h1>{data.student.name}</h1>
    <p>{data.student.info}</p>
    <br>

</div>