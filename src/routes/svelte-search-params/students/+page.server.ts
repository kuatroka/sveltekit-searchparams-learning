import { STUDENTS } from '$lib/server/db';

export const load = ({ url }) => {
	let search_from_server = url.searchParams.get('search')?.toString() ?? '';
	let id_from_server = Number(url.searchParams.get('id')) ?? 1;
	let skip_from_server = Number(url.searchParams.get('skip')) ?? 0;
	let room_from_server = Number(url.searchParams.get('room')) ?? 0;

	/* {
	  search: string;
	  page: number;
	} */
	let students = STUDENTS;

	if (search_from_server) {
		search_from_server = search_from_server.toLowerCase();
		students = students.filter((s) => s.name.toLowerCase().includes(search_from_server));
	}
	// console.log(students.slice(0, 1));
	console.log(search_from_server);
	console.log(id_from_server);
	console.log(skip_from_server);
	console.log(room_from_server);
	return {
		search_from_server,
		id_from_server,
		skip_from_server,
		room_from_server,
		students
	};
};
