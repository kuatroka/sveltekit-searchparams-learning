<script lang="ts">
    
	import { goto } from '$app/navigation';
    import { page } from '$app/stores'

    import { ssp, queryParam } from "sveltekit-search-params";

    $: ({ url } = $page)


// const search = queryParam("search", ssp.string('predator'));

    export let data

// $: ({ values } = data)
// $: ({ search } = values)


  $: search = queryParam("search", ssp.string());
  $: page_num = queryParam("page", ssp.number(1));

</script>
{data.search_param}

<p>
    {url.origin}{url.pathname}?
    <input class="border border-blue-700"
      value={url.search.replace('?', '')}
      placeholder="e.g. search=alien&page_num=3..."
      on:input={(x) =>
        goto(`${url.pathname}?${x.currentTarget.value}`, {
          replaceState: true,
          keepFocus: true,
          noScroll: true
        })}
    />
  </p>



<output class="flex flex-col ml-4">
    <code>search = {$search}</code>
    <code>page_num = {$page_num}</code>
</output>

  <hr>
  <!-- {search} -->
  <hr>
<div class="ml-4">

    {#each data.students as value}
    <p>{value.name}</p>
    {/each}
</div>

