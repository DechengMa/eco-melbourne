import moment from 'moment-business-days';

export const Colors = {
	mainGreen: '#489e52',
	mainYellow: '#e7853d',
	mainBlue: '#2f64a7'
};

export const isNumeric = value => {
	return /^-{0,1}\d+$/.test(value);
};

export const get_next_weekday = (hour, mins) => {
	return moment(new Date())
		.nextBusinessDay()
		.hour(hour ? hour : 8)
		.minutes(mins ? mins : 0)._d;
};

export const get_next_week_arr = (morningHour, afternoonHour, mins) => {
	return [
		moment(new Date())
			.nextBusinessDay()
			.hour(morningHour ? morningHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.hour(afternoonHour ? afternoonHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(morningHour ? morningHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(afternoonHour ? afternoonHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(morningHour ? morningHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(afternoonHour ? afternoonHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(morningHour ? morningHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(afternoonHour ? afternoonHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(morningHour ? morningHour : 8)
			.minutes(mins ? mins : 0)._d,
		moment(new Date())
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.nextBusinessDay()
			.hour(afternoonHour ? afternoonHour : 8)
			.minutes(mins ? mins : 0)._d
	];
};
