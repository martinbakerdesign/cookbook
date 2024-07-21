import { Readable, Stores, writable } from "svelte/store";

export default function useReducer(initialState: string, reducer): [ Readable<string>, Function ] {
	const { update, subscribe } = writable(initialState);
	
	function dispatch(action) {
		update($state => reducer($state, action));
	}
	
	return [ { subscribe } as Readable<string>, dispatch ];
}