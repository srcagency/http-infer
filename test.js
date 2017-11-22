'use strict';

const test = require('tape');
const pull = require('pull-stream');
const infer = require('./');

test(function( t ){
	t.deepEqual(infer(undefined), { code: 204 });
	t.deepEqual(infer(null), { code: 200, json: null });
	t.deepEqual(infer(true), { code: 200, json: true });

	t.deepEqual(infer({
		age: 25
	}), {
		code: 200,
		json: {
			age: 25
		}
	});

	t.deepEqual(infer({
		code: 400,
		message: 'Invalid'
	}), {
		code: 400,
		message: 'Invalid'
	});

	var ps = pull.values([ 'a', 'b', 'c' ]);

	t.deepEqual(infer(ps), {
		code: 200,
		json: ps
	});

	t.end();
});
