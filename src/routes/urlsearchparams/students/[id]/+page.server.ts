import { STUDENTS } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
    // const search = url.searchParams.get('search') || 'empty';
	const student = STUDENTS.find((s) => s.id === params.id);

	if (!student) throw error(404);
    console.log('server reload is triggered - id')
	return { student };
}
