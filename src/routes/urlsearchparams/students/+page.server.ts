import { STUDENTS } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	let students = STUDENTS;
	let student_max_id = Math.max(...students.map((student) => parseInt(student.id)));

	console.log(`student_max_id: ${student_max_id}`);
	let search = url.searchParams.get('search') || '';
	let id = url.searchParams.get('id') || student_max_id.toString();

	if (search) {
		search = search.toLowerCase();
		students = students.filter((s) => s.name.toLowerCase().includes(search));
	}

	console.log('server reload is triggered - student');
	console.log(`server reload is triggered - id: ${id}`);
	let loadTime = new Date().toISOString();
	console.log(`Load time for student_max_id: ${loadTime}`);
	return { students, student_max_id };
}
