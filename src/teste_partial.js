/** @format */

const _ = require('lodash');

function soma(a, b) {
	return a + b;
}

const teste = _.partial(soma, 3);

let result = teste(12);

console.log(result);
