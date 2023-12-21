import { define } from 'svelte-qparam';
import { number, string } from 'svelte-qparam/serde';

export const extract = define({
	search: string,
	id: number
});
