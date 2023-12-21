import { STUDENTS } from '$lib/server/db';
import { extract } from './extract.js';

export const load = ({ url }) => {
	const { values } = extract(url);
	/* {
	  search: string;
	  sex: number;
	  page: number;
	} */
	let students = STUDENTS;

	if (values.search) {
		values.search = values.search.toLowerCase();
		students = students.filter((s) => s.name.toLowerCase().includes(values.search));
	}

	// console.log(values)
	console.log(students);

	return {
		values,
		students
	};
};

// export async function load({ url }) {
// 	let students = STUDENTS;
// 	let search_param = get(search);

// 	// let search_param = url.searchParams.get('search')  || '';

// 	// if (search_param) {
// 	// 	search_param = search_param.toLowerCase();
// 	// 	students = students.filter((s) => s.name.toLowerCase().includes(search_param));
// 	// }

//     console.log('server search param search: ', search_param)
// 	console.log('server reload is triggered - student')
// 	return { students };
// };
