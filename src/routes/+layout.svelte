<script lang="ts">
	import '../app.postcss';

	import { ModeWatcher } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import * as Menubar from "$lib/components/ui/menubar";
	import { Sun, Moon } from "radix-icons-svelte";
	import { toggleMode } from "mode-watcher";
</script>

<ModeWatcher />
<div class="grid grid-flow-col justify-between p-2">
	<nav class="flex gap-8">	
		<Menubar.Root>
			<Menubar.Menu>
				<a href="/"><Menubar.Item>Home</Menubar.Item></a>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger >svelte-search-params</Menubar.Trigger>
				<Menubar.Content>
				<a href="/svelte-search-params/students"><Menubar.Item>Students</Menubar.Item></a>					
				<a href="/svelte-search-params/students/1"><Menubar.Item>Students - ID</Menubar.Item></a>
				</Menubar.Content>
			</Menubar.Menu>
			
			<Menubar.Menu>
				<Menubar.Trigger >svelte-qparam</Menubar.Trigger>
				<Menubar.Content>
				<a href="/svelte-qparam/"><Menubar.Item>Main</Menubar.Item></a>
				<a href="/svelte-qparam/students/"><Menubar.Item>Students</Menubar.Item></a>					
				<a href="/svelte-qparam/students/1"><Menubar.Item>Students - ID</Menubar.Item></a>
				</Menubar.Content>
			</Menubar.Menu>
			
			<Menubar.Menu>
				<Menubar.Trigger >url.searchParams</Menubar.Trigger>
				<Menubar.Content>
				<a href="/urlsearchparams/students/"><Menubar.Item>Main</Menubar.Item></a>				
				<a href="/urlsearchparams/students/0/"><Menubar.Item>Students - ID</Menubar.Item></a>
				</Menubar.Content>
			</Menubar.Menu>

		</Menubar.Root>
		
	</nav>

	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
	
	
</div>

<slot />


<style>




</style>
