import {formEdit} from './utils/constants';
import {
	getAxis,
	getMaxArrValue,
	getPrecision,
	getDigits,
	getNextMultipleValue,
	getRandomInt,
	toThousands
} from './utils/utils';
import {bb} from 'billboard.js';

const colors = ['#BD0419', '#D28910', '#018671', '#0689BF'];

/**
 * Return an array with axis Y
 * @param {array} data
 * @param {number} intervals
 */
const getAxisY = (data, intervals) => {
	/**
	 * get max value from an array
	 * @param {array} data
	 */
	const maxValue = getMaxArrValue(data);

	/**
	 * get the total of digits from a max value
	 * @param {number} maxValue
	 * @example 8 => 1, 88 => 2, 888 => 3, 8888 => 4
	 */
	const digits = getDigits(maxValue);

	/**
	 * get the precision number
	 * @param {number} digits
	 * @param {number} intervals
	 * @example (4 digits, 6 intervals) => 600, (4, 4) => 400, (6, 4) => 40000
	 */
	const precision = getPrecision(digits, intervals);

	/**
	 * get the max value rounded
	 * @param {number} maxValue
	 * @param {number} precision
	 */
	const maxValueRounded = getNextMultipleValue(maxValue, precision);

	return getAxis(maxValueRounded, intervals)
}

/**
 * Method to generate a new chart
 * @param {array} data
 * @param {number} intervals
 */
const generateChart = (data, intervals, color = colors[3], formatNumbers = false) => {
	/**
	 * get the array of values
	 * @param {array} data
	 * @param {number} intervals
	 */
	const axisData = getAxisY(data, intervals);

	/**
	 * get the max value from array of axis y
	 * @param {array} axisData
	 */
	const axisMaxValue = getMaxArrValue(axisData);

	bb.generate({
		axis: {
			y: {
				padding: {
					top: 0,
					bottom: 0
				},
				tick: {
					format: value => formatNumbers ? toThousands(value) : value,
					values: axisData
				},
				max: axisMaxValue
			}
		},
		bar: {
			width: {
				ratio: 0.9,
			}
		},
		data: {
			colors: {
				data1: color,
				data2: '#FFFFFF'
			},
			columns: [["data1", ...data], ["data2", ...data]],
			types: {
				data1: "bar",
				data2: "area-spline"
			}
		},
		grid: {
			y: {
				show: true
			}
		},
		bindto: "#chart"
	});
}

// Random chart default on load the page
generateChart([200, 30, 500, 2000, 320], 4);

/**
 * Generate a new char when submit a form
 * @param {event} event 
 */
const handleSubmitEvent = event => {
	event.preventDefault();
	
	const {intervals, maxValue, formatNumbers, btnSubmit} = event.target;


	// Method to get a random value
	const randomIn = () => getRandomInt(0, maxValue.value ? maxValue.value : 9999999);

	// Random data with the first item always with max value
	const newData = [maxValue.value, randomIn(), randomIn(), randomIn(), randomIn()];

	const color = colors[getRandomInt(0, colors.length)];

	btnSubmit.style.backgroundColor = color;

	generateChart(newData, intervals.value, color, formatNumbers.checked);
}

formEdit.addEventListener('submit', handleSubmitEvent);