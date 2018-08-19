import * as d3 from 'd3';

export const getAxis = (maxValue, intervals) => {
	const range = maxValue / intervals;
	let axis = [range];
	
	for (let i = 1; i < intervals - 1; i++) {
		axis[i] = axis[i - 1] + range;
	}	
	
	return [0, ...axis, maxValue];
}

export const getNextMultipleValue = (value, multiplier) => {
	if (value % multiplier) {
		value = value + (multiplier - value % multiplier);
	}
	
	return value;
}

export const getDigits = value => Math.log(value) * Math.LOG10E + 1 | 0;

export const getPrecision = (digits, value) => {
	let s = `${value}`;
	
	while (s.length  < digits - 1) {
		s += "0";
	}
	
	return parseInt(s);
}

export const getMaxArrValue = arr => Math.max(...arr);

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const removeZeroPrecision = str => str.replace(/\.(0)+(k|G|M)?$/, '$2');

export const toThousands = value => {
	const formatter = d3.format('2.2s');

	return removeZeroPrecision(formatter(value)).trim().toUpperCase()
};