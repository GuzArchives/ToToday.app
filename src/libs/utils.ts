// * Thanks Alnitak for the original code https://stackoverflow.com/a/6491621

const resolvePath = (path: string) => {
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');
	return path.split('.');
};

const obj = {
	setByString: (object: object | any, newValue: any, path: string) => {
		const a = resolvePath(path);

		for (let i = 0; i < a.length; i++) {
			const k = a[i];
			object[k] = newValue;
		}

		return object;
	},
	getByString: (object: object | any, path: string) => {
		const a = resolvePath(path);
		for (let i = 0; i < a.length; i++) {
			const k = a[i];
			if (k in object) {
				object = object[k];
			} else {
				return undefined;
			}
		}
		return object;
	},
};

export default obj;
