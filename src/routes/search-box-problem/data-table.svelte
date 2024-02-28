<script lang="ts">
	import type { Track } from '$lib/server/types'

	import { goto } from "$app/navigation";
	import { page } from '$app/stores'
	import debounce from 'debounce';	
	
	import {createTable, Subscribe, Render,	createRender} from "svelte-headless-table";
	import {addSortBy, addPagination,	addTableFilter,
		addSelectedRows,addHiddenColumns, addResizedColumns	} from "svelte-headless-table/plugins";
	import { writable, type Writable } from "svelte/store";
	import * as Table from "$lib/components/ui/table";
	import { Button } from "$lib/components/ui/button";
	import { CaretSort, ChevronDown, ChevronUp } from "radix-icons-svelte";
	import { X, ArrowUpDown } from 'lucide-svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";


	export let order_by: string = "";
	export let order_dir: string = "";


	export let tracks: Track[]; 

	const entries: Writable<Track[]> = writable([]);
	$: $entries = tracks;

	// $: tracks = tracks 
	$: row_count = tracks[0].row_count

	const table = createTable(entries, {
		resize: addResizedColumns(),
		sort: addSortBy({
			serverSide: true,
			toggleOrder: ['desc', 'asc']
		}),
		page: addPagination({
			serverSide: true,
			serverItemCount: writable(row_count),
		}),
		filter: addTableFilter({
			serverSide: true,
			// fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([

	
		table.column({
			header: "Track ID",
			accessor: "trackId",
			plugins: { sort: { disable: false }, filter: { exclude: false } }
		}),
		table.column({ header: "Track Name", accessor: "trackName"}),

		
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
	} = table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	let { pageIndex, pageSize } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	$: q = $page.url.searchParams.get('q')?.toString() || '';
	$: skip_param = Number($page.url.searchParams.get('skip') ?? 0);
	$: limit_param = Number($page.url.searchParams.get('limit') ?? 5);

	$: filter = q || '';
	$: $pageSize =  limit_param;
	$: $pageIndex = (skip_param / limit_param) || 0;

	$:_totalRows = row_count;
	$: _totalPages = Math.ceil(_totalRows / $pageSize)


	const { selectedDataIds } = pluginStates.select;

	$: _sortKeys = $sortKeys;
	
	$: _totalViewedEntries = ($pageIndex * $pageSize + $pageRows.length)

	$: _hasNextPage = $pageIndex + 1 < _totalPages;
	$: _hasPreviousPage = $pageIndex > 0;

	$: order_by = _sortKeys[0]?.id || '';
	$: order_dir = _sortKeys[0]?.order || '';

	const handleFilterChange = debounce(() => {
	goto(`/search-box-problem?limit=${$pageSize}&skip=${$pageSize * $pageIndex}&q=${filter}&order_by=${order_by}&order_dir=${order_dir}`,
		{  replaceState: true, keepFocus: true });
  }, 200);


</script>

<div class="w-full">
	<div class="mb-4 flex items-center gap-4">
		<Input
		class="max-w-sm" 
		placeholder="Filter superinvestors..."
		type="search"
		bind:value={filter}
		on:input={handleFilterChange} 
	/>
	
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<Table.Head class="w-1/6"
										{...attrs}
									>
										{#if props.sort.disabled}
											<Render of={cell.render()} />
										{:else}
										<Button variant="ghost" on:click={(e) => {
											props.sort.toggle(e);
											handleFilterChange();
										}}>
											<Render of={cell.render()} />
											
											{#if props.sort.order === 'asc'}
												<ChevronUp class="ml-2 h-4 w-4" />
											{:else if props.sort.order === 'desc'}
												<ChevronDown class="ml-2 h-4 w-4" />
												{:else}
												<CaretSort class="ml-2 h-4 w-4" />
											{/if}
										</Button>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row 
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell 
										{...attrs}
									>
									{#if cell.id === 'cik_name'}
										<a href="/{row.cells.find(c => c.id === 'cik')?.value}" 
										class="line-clamp-1">{cell.value}</a>
									{:else}
										<Render of={cell.render()} />
									{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{_totalViewedEntries} of 
			{_totalRows} Entries
		</div>
		<Button 
			variant="outline"
			size="sm" 
			on:click={() => {$pageIndex = $pageIndex - 1;
							handleFilterChange();}}
			disabled={!_hasPreviousPage}>Previous</Button>
		<div class="flex text-sm text-muted-foreground">
			{$pageIndex + 1} of {_totalPages} Pages			
		<!-- <span> {$pageIndex + 1} out of {$pageCount}</span> -->
		</div>

		<Button
			variant="outline"
			size="sm"
			disabled={!_hasNextPage}
			on:click={() => {
				$pageIndex = $pageIndex + 1,
				handleFilterChange()
			}}>Next</Button
		>
	</div>
</div>


<!-- #TODO: Server side search and paginatin mostly work, but needs refinement. Sort is not implemented yet at all -->