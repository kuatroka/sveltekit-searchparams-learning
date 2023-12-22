<script lang="ts">
    import debounce from 'debounce';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { ssp, queryParam } from "sveltekit-search-params";

    import { Input } from "$lib/components/ui/input"
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button"
	import { derived, writable } from 'svelte/store';
	import type { number } from 'svelte-qparam/serde';


    export let data;
    $: search_param = queryParam("search", ssp.string(""));
    $: id_param = queryParam("id", ssp.number(0));
    $: skip_param = queryParam("skip", ssp.number(0));
    

    $: ({ search_from_server, id_from_server, skip_from_server } = data);

    $: ({ url } = $page)
    
  
    const updateSearch = debounce((search) => {
          goto(`?search=${search}`, { replaceState: true, keepFocus: true });
        }, 200);


    const handleInput = (event: Event) => {
        updateSearch((event.target as HTMLInputElement).value);
      };


    const updateQueryString = (name: string, value: string | number) => {
      const params = new URLSearchParams(window.location.search);
      params.set(name, value.toString());

      // Automatically create or update the 'room' search string
      if (name === 'id') {
        const roomId = Number(value) * 4;
        params.set('room', roomId.toString());
      }

      const queryString = params.toString();
      const url = `${window.location.pathname}?${queryString}`;


      goto(url, {
        replaceState: true,
        keepFocus: true,
        noScroll: true
      });
    }

    	// async function updateQuery() {
	// 	const q = new URLSearchParams();
	// 	q.set('order_by', $sortKeys[0].id);
	// 	q.set('order_dir', $sortKeys[0].order);
	// 	q.set('filter', $filterValue);
	// 	q.set('limit', String($pageSize));
	// 	q.set('skip', String($pageSize * $pageIndex));
	// };

    // const debouncedUpdateQueryString = (key: string, value: string) => debounce(updateQueryString, 100)(key, value);


    // let buttonValue = derived(skip_param, id_param, ($skip_param, $id_param) => $skip_param * $id_param );
    // import { derived } from 'svelte/store';

    // const buttonValue = derived([skip_param, id_param], ([$skip_param, $id_param]) => ($skip_param ?? 0) * ($id_param ?? 0));
    // $buttonValue = $skip_param * $id_param


  </script>

<div class="ml-3">

  <h1 class="mb-8"  > svelte-search-params with multiple params</h1>
  <h2>Combines Svelte stores from  <code>svelte-search-params</code> and <code>on:click</code> functions for buttons </h2>
  <h2>It works in `+page.server.ts` too</h2>
</div>



<!-- //////////////////////////// -->
<h2 class="ml-4 mb-8 text-3xl"  > <code>shadcn-svelte</code>: Input, Table</h2>

<div class="card w-1/4 ">
  <div class="gap-2 ml-2">
    <Input
      name="search"
      placeholder="Filter names..."
      type="search"
      bind:value={$search_param}
      />
    </div>
    <!-- on:input={(x) => updateQueryString('search', x.currentTarget.value)} -->


  <div class="gap-2 ml-2">
    <Input
      placeholder="Filter names..."
      type="range"
      bind:value={$id_param}
      />
    </div>
    <!-- on:input={(x) => updateQueryString('id', x.currentTarget.value)} -->

  <div class="gap-2 ml-2">
    <Button 
    on:click={() => updateQueryString('skip', $id_param * 3)}
  >
  Generate skip value
</Button>
</div>
<!-- bind:value={$skip_param} -->

  <Table.Root class="mt-4 ml-2 overflow-x-hidden">
    <Table.Caption>A list of students.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Student ID</Table.Head>
        <Table.Head class="text-right">Full Name</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.students as student, id (id)}
      <Table.Row>
        <Table.Cell class="font-medium">{student.id}</Table.Cell>
        
          <Table.Cell class="text-right">
            <a href="/svelte-qparam/students/{student.id}">
            {student.name}
          </a>
          </Table.Cell>
      </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>






   <!-- <style>
    a {
      display: block;
    }
  </style> -->