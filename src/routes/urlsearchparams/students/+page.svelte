<script lang="ts">
    import debounce from 'debounce';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

  


    import { Input } from "$lib/components/ui/input"
    import * as Table from "$lib/components/ui/table";


    export let data;
    $:( {student_max_id, students} = data);

  
    const updateSearch = debounce((search) => {
          goto(`?search=${search}`, { replaceState: true, keepFocus: true });
        }, 100);


    const handleInput = (event: Event) => {
        updateSearch((event.target as HTMLInputElement).value);
      };

    $: search_qparam = $page.url.searchParams.get('search') || ''

    $: id_param = $page.url.searchParams.get('id') || student_max_id;
    $: student_name_param = students.find(student => student.id === id_param)?.name || 'Unknown';

    const updateQueryString = (name: string, value: string | number) => {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value.toString());
        goto(`?${params.toString()}`);
        };

        // Debounced version of updateQueryString for 'id' parameter
    const debouncedUpdateId = debounce((idValue: string) => {
        updateQueryString('id', idValue);
    }, 200); // Adjust debounce delay as needed


  </script>
  <h1 class="mb-8"  > Standard url.searchParams with one key</h1>
student_max_id:  {student_max_id} - {new Date().toISOString()} <br>
student's name: {student_name_param}







<!-- //////////////////////////////////////////////////////// -->
<div class="gap-2 ml-2 w-48">
  <input
    placeholder="Filter names..."
    type="range"
    min=0
    max = {student_max_id}
    value={id_param}
    on:input={(x) => debouncedUpdateId(x.currentTarget.value)}
    />
    {id_param}
  </div>



<h2 class="l-4  mb-8 text-3xl"  > Using html input</h2>
<div class="pl-3">
  <input 
  class="pl-1 border border-slate-500"
  type="search"
  name="search"
  value={search_qparam}
  on:input={handleInput}
  >
</div>

<ul class="py-2 flex flex-col gap-4 mb-8">
  {#each data.students as student (student.id)}
  <li class="flex flex-row gap-4 pl-3 justify-star items-center" >
    <div class="inline-block">
      <a href="/urlsearchparams/students/{student.id}">{student.name}</a>
    </div>
  </li>
  {/each}
</ul>
<hr>
<!-- //////////////////////////////////////////////////////// -->


<!-- //////////////////////////// -->
<h2 class="ml-4 mb-8 text-3xl"  > Using `shadcn-svelte` "Input"</h2>

<div class="card w-1/4">
  <div class="flex items-center gap-2 ml-2">
    <Input
      placeholder="Filter names..."
      type="search"
      bind:value={search_qparam}
      on:input={handleInput}
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
            <a href="/urlsearchparams/students/{student.id}">
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