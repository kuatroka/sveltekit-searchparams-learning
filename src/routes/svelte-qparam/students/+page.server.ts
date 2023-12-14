import { STUDENTS } from '$lib/server/db';
import { extract } from '../extract.js'


export const load = ({ url }) => {
	const { values } = extract(url)
	/* {
	  search: string;
	  id: number;
	} */
	let students = STUDENTS;

	if (values.search) {
		values.search = values.search.toLowerCase();
		students = students.filter((s) => s.name.toLowerCase().includes(values.search));
	}
  
	// console.log(values)
	console.log(students)
	console.log(values)
  
	return {
		values,
		students
	}
  }