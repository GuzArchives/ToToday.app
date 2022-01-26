import appInfo from '~~/package.json';
import date from '~/libs/date';

const storageIndex = 'ToToday-storage';

/**
 * (Local) Storage Management of the application.
 */
const sm = {
	/**
	 * Adds new value on `data`. *Don't create or rewrite the value if it already exists.*
	 * @param {string} key New key on `data`;
	 * @param {any} value New value;
	 */
	add: (key: string, value: any) => {
		const data = sm.getJSON().data;

		if ( data[key] ) return window.alert('ERROR: Value already in storage');

		data[key] = value;

		sm.setJSON(data);

	},

	/**
	 * Rewrite a value inside of `data` with a new *(creates a new key/value if it's doesn't exist before)*.
	 * @param {string} key Value's key on `data`;
	 * @param {any} value The new value to replace;
	 * @param {boolean | undefined} getOld Return the old value of the key?
	 * @param {boolean | undefined} meta Update a value on `meta`?
	 *
	 * @returns The old value of the key, if `getOld` is `true`.
	 */
	set: (key: string, value: any, getOld?: boolean, meta?: boolean): void | any => {

		if( meta ) {
			const metaData = sm.getJSON();
			metaData.meta[key] = value;
			sm.setJSON(metaData, true);
			return;
		}

		const data = sm.getJSON().data;

		const oldValue = data[key];

		if ( !data[key] ) return sm.add(key, value);

		data[key] = value;

		sm.setJSON(data);

		if ( getOld ) return oldValue;
	},

	get: (meta?: boolean) => {
		const storage = sm.getJSON()

		if (meta) {
			return storage.meta;
		}

		if (storage.data) return storage.data;

		return undefined;
	},

	/**
	 * Gets and parses the local storage JSON file.
	 *
	 * **Used internally by the storage management.**
	 */
	getJSON: (): any => {
		sm.checkJSON();
		return JSON.parse(localStorage.getItem(storageIndex) + '');
	},

	/**
	 * Sets a new `data` on the local storage JSON file *(also updates the `date.updated` meta-information)*.
	 * @param {object} newData New data object to be updated/set;
	 * @param {boolean} meta Do new data parameters contain `meta` information?
	 *
	 * **Used internally by the storage management.**
	 */
	setJSON: (newData: object, meta?: boolean) => {
		if (meta)
			localStorage.setItem(storageIndex, JSON.stringify(newData));
		else {
			const newJSON = { meta: sm.getJSON().meta, data: newData }

			localStorage.setItem(storageIndex, JSON.stringify(newJSON));
		}

		const data = sm.getJSON();

		data.meta.date.updated = date.full();

		localStorage.setItem(storageIndex, JSON.stringify(newData));
	},

	/**
	 * Check if there's already an app's local storage file exists or if it's valid and creates a new one if there's isn't.
	 *
	 * **Used internally by the storage management.**
	 */
	checkJSON: () => {
		try {
			JSON.parse(localStorage.getItem(storageIndex)+'')
		} catch (error) {
			sm.createJSON(true);
		}
		if (!localStorage.getItem(storageIndex) || !JSON.parse(localStorage.getItem(storageIndex)+'').meta)
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

		const colorTheme = localStorage.getItem('nuxt-color-mode');

		const storage = {
			meta: {
				index: storageIndex,
				name: appInfo.name,
				version: appInfo.version,
				theme: colorTheme,

				date: {
					created: date.full(),
					updated: date.full(),
				},
			},
			data: {},
		};

		sm.setJSON(storage, true);
	},
};

export default sm;
