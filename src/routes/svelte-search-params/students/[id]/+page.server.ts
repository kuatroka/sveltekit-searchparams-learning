import { STUDENTS } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = ({ params, url }) => {
    console.log(url.origin+ url.pathname);
    let id = params.id || 0;
    

    let student = STUDENTS.find((s) => s.id === id);
    console.log(student);

    return { student };
}