import { getInitialTracks } from '$lib/server/sqlite';

export const load = async ({ url }) => {
	let limit_from_server = Number(url.searchParams.get('limit') ?? 5);
	let skip_from_server = Number(url.searchParams.get('skip')) ?? 0;
	let search_from_server = url.searchParams.get('q')?.toString() ?? '';

	let tracks = getInitialTracks(limit_from_server, skip_from_server, search_from_server);

	console.log('limit from server:', limit_from_server);
	console.log('skip from server:', skip_from_server);
	console.log('search from server:', search_from_server);
	console.log(tracks.slice(0, 3));
	return { tracks_entries: tracks };
};
