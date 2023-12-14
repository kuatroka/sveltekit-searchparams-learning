<script lang="ts">
    
	import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { qparam, array } from 'svelte-qparam'
    import { boolean, number } from 'typed-qparam/serde'

    $: ({ url } = $page)


// const search = queryParam("search", ssp.string('predator'));

    export let data

$: ({ values } = data)
$: ({ search } = values)


  $: str = $qparam('str')
  $: num = $qparam('num', number)
  $: bool_array = $qparam('bool_array', array(boolean))

</script>


<p>
    {url.origin}{url.pathname}?
    <input class="border border-blue-700"
      value={url.search.replace('?', '')}
      placeholder="e.g. str=string&num=123&bool_array=true&bool_array=false&bool_array=true..."
      on:input={(x) =>
        goto(`${url.pathname}?${x.currentTarget.value}`, {
          replaceState: true,
          keepFocus: true,
          noScroll: true
        })}
    />
  </p>



<output class="flex flex-col ml-4">
    <code>str = {$str}</code>
    <code>num = {$num}</code>
    <code>bool_array = {JSON.stringify($bool_array)}</code>
</output>

  <hr>
  {search}
  <hr>
<div class="ml-4">

    {#each data.students as value}
    <p>{value.name}</p>
    {/each}
</div>

