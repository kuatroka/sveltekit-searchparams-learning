import { STUDENTS } from '$lib/server/db';

// import { store, search } from './extract.js'


export const load = ({ url, params }) => {
	let search_param = url.searchParams.get('search') || '';
	let page_param = url.searchParams.get('page') || 1;

	/* {
	  search: string;
	  page: number;
	} */
	let students = STUDENTS;

	if (search_param) {
		search_param = search_param.toLowerCase();
		students = students.filter((s) => s.name.toLowerCase().includes(search_param));
	}
	console.log(students.slice(0, 1))
	console.log(search_param)
	console.log(page_param)
	return {
		search_param,
		students,
		
	}
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