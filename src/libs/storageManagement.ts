import get from 'lodash-es/get';
import set from 'lodash-es/set';

import appInfo from '~~/package.json';
import date from '~/libs/date';

const obj = {set, get};

const storageIndex = 'ToToday-storage';

/**
 * (Local) Storage Management of the application.
 */
const sm = {
	/**
	 * Adds new value on `data`. *Don't create or rewrite the value if it already exists.*
	 * @param {string} path New value's path on `data`;
	 * @param {any} value New value;
	 * @param {string | string[] | undefined} event Event or list of events types/names to be dispatched;
	 */
	add: (path: string, value: any, event?: string | string[]): void => {
		let storage = sm.getJSON();

		path = `data.${path}`;

		if (obj.get(storage, path))
			return window.alert('ERROR: Value already in storage');

		storage = obj.set(storage, path, value);

		sm.setJSON(storage, event);
	},

	/**
	 * Rewrite a value inside of `data` with a new *(creates a new path/value if it's doesn't exist before)*.
	 * @param {string} path Value's path on `data`;
	 * @param {any} value The new value to replace;
	 * @param {string | string[] | undefined} event Event or list of events types/names to be dispatched;
	 *
	 * @returns The old value of the path, if `getOld` is `true`.
	 */
	set: (path: string, value: any, event?: string | string[]): void => {
		let storage = sm.getJSON();

		if (!obj.get(storage, `data.${path}`) && !path.startsWith('!'))
			return sm.add(path, value, event);

		path = path.startsWith('!') ? `meta.${path.substring(1)}` : `data.${path}`;

		storage = obj.set(storage, path, value);

		sm.setJSON(storage, event);
	},

	/**
	 * Gets a value from localStorage*.
	 * @param {string | undefined} path Value's path on `data`;
	 *
	 * @returns {any | undefined} Value on localStorage (or undefined if no value wasn't found).
	 */
	get: (path?: string): any | undefined => {
		const storage = sm.getJSON();

		if (!path) return storage.data;
		else if (path === '!') return storage.meta;

		path = path.startsWith('!') ? `meta.${path.substring(1)}` : `data.${path}`;

		return obj.get(storage, path);
	},

	/**
	 * Removes a value from localStorage's data
	 * @param {string} path Value's path on `data`;
	 * @param {string | string[] | undefined} event Event or list of events types/names to be dispatched;
	 *
	 * @returns The old value of the path, if `getOld` is `true`.
	 */
	remove: (path: string, event?: string | string[]): void | any => {
		let storage = sm.getJSON();

		storage = obj.set(storage, `data.${path}`, undefined);

		sm.setJSON(storage, event);
	},

	/**
	 * Returns the size of the localStorage in KB
	 */
	getSize: () => {
		const size = new TextEncoder().encode(JSON.stringify(sm.getJSON())).length;
		return size / 1024;
	},

	/**
	 * Gets and parses the local storage JSON file.
	 *
	 * **Used internally by the storage management.**
	 */
	getJSON: (): StorageSchema => {
		sm.checkJSON();
		return JSON.parse(localStorage.getItem(storageIndex) + '');
	},

	/**
	 * Sets a new `data` on the local storage JSON file *(also updates the `date.updated` meta-information)*.
	 * @param {StorageSchema} newData New data object to be updated/set;
	 * @param {string | string[]} event Event or list of events types/names to be dispatched;
	 * @param {boolean} meta Do new data parameters contain `meta` information?
	 *
	 * **Used internally by the storage management.**
	 */
	setJSON: (
		newData: StorageSchema,
		event?: string | string[],
	) => {
		localStorage.setItem(storageIndex, JSON.stringify(newData));

		const updatedMeta = sm.getJSON().meta;

		updatedMeta.date.updated = date.full();

		const updatedJSON: StorageSchema = {
			meta: updatedMeta,
			data: newData.data,
		};

		localStorage.setItem(storageIndex, JSON.stringify(updatedJSON));

		if (event || event !== '') {
			if (event instanceof Array) {
				for (const e of event) {
					window.dispatchEvent(new CustomEvent(`storageUpdated-${e}`));
				}
			} else {
				window.dispatchEvent(new CustomEvent(`storageUpdated-${event}`));
			}
		} else {
			window.dispatchEvent(new CustomEvent('storageUpdated'));
		}
		window.dispatchEvent(new CustomEvent('storageUpdated-meta'));
	},

	/**
	 * Check if there's already an app's local storage file exists or if it's valid and creates a new one if there's isn't.
	 *
	 * **Used internally by the storage management.**
	 */
	checkJSON: () => {
		try {
			JSON.parse(localStorage.getItem(storageIndex) + '');
		} catch (error) {
			sm.createJSON(true);
		}
		if (
			!localStorage.getItem(storageIndex) ||
			!JSON.parse(localStorage.getItem(storageIndex) + '').meta
		)
			sm.createJSON(true);

		if (
			!localStorage.getItem(storageIndex) ||
			!JSON.parse(localStorage.getItem(storageIndex) + '').data
		)
			sm.createJSON(true);
	},

	/**
	 * Creates and sets an entire new JSON file on the local storage with meta-information about the app and file itself.
	 * @param {boolean} reset Force creation of a file even if it's already created?
	 *
	 * **Used internally by the storage management.**
	 */
	createJSON: (reset?: boolean) => {
		if (localStorage.getItem(storageIndex) && !reset)
			return window.alert('ERROR: Local storage already exists');

		const colorTheme: 'light' | 'dark' | string =
			localStorage.getItem('nuxt-color-mode') || 'light';

		const storage: StorageSchema = {
			meta: {
				index: storageIndex,
				name: appInfo.name,
				version: appInfo.version,
				theme: colorTheme,

				date: {
					created: date.full(),
					updated: date.full(),
				},

				lastOpen: {
					version: appInfo.version,
					date: date.full(),
				},
			},
			data: {},
		};

		sm.setJSON(storage, 'meta');
	},
};

export default sm;
