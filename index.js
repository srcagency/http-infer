'use strict';

const a204 = { code: 204 };

module.exports = infer;

function infer( result ){
	if (result === undefined)
		return a204;

	if (result !== null && typeof result === 'object' && result.code !== undefined)
		return result;

	return {
		code: 200,
		json: result,
	};
}
