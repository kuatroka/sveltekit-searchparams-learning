<script lang="ts">
    import debounce from 'debounce';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { ssp, queryParam } from "sveltekit-search-params";

    import { Input } from "$lib/components/ui/input"
    import * as Table from "$lib/components/ui/table";


    export let data;
    // $: search = queryParam("search", ssp.string(""));
    // $: page_num = queryParam("page_num", ssp.number(2));

    $: ({ search_from_server, id_from_server } = data);

    $: ({ url } = $page)
    
  
    const updateSearch = debounce((search) => {
          goto(`?search=${search}`, { replaceState: true, keepFocus: true });
        }, 200);


    const handleInput = (event: Event) => {
        updateSearch((event.target as HTMLInputElement).value);
      };

  </script>


  <h1 class="mb-8"  > svelte-search-params with one key</h1>



<!-- //////////////////////////// -->
<h2 class="ml-4 mb-8 text-3xl"  > <code>shadcn-svelte</code>: Input, Table</h2>

<div class="card w-1/4 ">
  <div class="gap-2 ml-2">
    <Input
      placeholder="Filter names..."
      type="search"
      value={search_from_server}
      on:input={(x) =>
        goto(`?search=${x.currentTarget.value}&id=${id_from_server}`, {
          replaceState: true,
          keepFocus: true,
          noScroll: true
        })}
    />
  </div>


  <div class="gap-2 ml-2">
    <Input
      placeholder="Filter names..."
      type="range"
      value={id_from_server}
      on:input={(x) =>
        goto(`?search=${search_from_server}&id=${x.currentTarget.value}`, {
          replaceState: true,
          keepFocus: true,
          noScroll: true
        })}
    />
  </div>

  <Table.Root class="mt-4 ml-2">
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






   <style>
    a {
      display: block;
    }
  </style>