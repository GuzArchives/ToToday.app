type DateInfo = {
	day: {
		year: number;
		month: number;
		number: number;
		readable: string;
	};
	hour: {
		hours: number;
		minutes: number;
		seconds: number;
		milliseconds: number;
		readable: string;
	};
	timeZone: string | number;
};

type MetaInfo = {
	index: string;
	name: string;
	theme: 'dark' | 'light' | string;
	version: `${number}.${number}.${number}` | string;
	date: {
		created: DateInfo;
		updated: DateInfo;
	};
	lastOpen?: {
		version: `${number}.${number}.${number}` | string;
		date: DateInfo;
	};
};

type DataInfo = {
	tasks?: Task[];
	[name: string | number]: any;
};

type StorageSchema = {
	meta: MetaInfo;
	data: DataInfo;
};
