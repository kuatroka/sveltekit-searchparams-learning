import type { PageLoad } from './$types';
import { redirect } from "@sveltejs/kit";

export const load = (async () => {
    throw redirect(303, "/svelte-qparam/students/1");
}) satisfies PageLoad;