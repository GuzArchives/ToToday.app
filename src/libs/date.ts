const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const date = {

	dayNumber: () => new Date().getDate(),

	month: () => new Date().getMonth(),

	monthName: (i: number) => months[i],

	year: () => new Date().getFullYear(),

	day: (): any => {
		return {
			readable: `${String(date.dayNumber()).padStart(2, '0')} ${date.monthName(Number(date.month()))} ${date.year()}`,
			number: date.dayNumber(),
			month: date.month(),
			year: date.year(),
		}
	},

	hours: () => {
		const d = new Date();

		return {
			readable: `${d.getHours()}:${d.getMinutes()}`,
			hours: d.getHours(),
			minutes: d.getMinutes(),
			seconds: d.getSeconds(),
			milliseconds: d.getMilliseconds(),
		}
	},

	timeZone: () => String(new Date().getTimezoneOffset()),

	full: () => {
		return {
			day: date.day(),
			hour: date.hours(),
			timeZone: date.timeZone(),
		}
	},

};

export default date;
