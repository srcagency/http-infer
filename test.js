'use strict';

const test = require('tape');
const pull = require('pull-stream');
const infer = require('./');

test(function(t) {
	t.plan(6);

	t.deepEqual(infer(undefined), { code: 204 }, '`undefined` value returns correct code');
	t.deepEqual(infer(null), { code: 200, json: null }, '`null` value returns correct code and value');
	t.deepEqual(infer(true), { code: 200, json: true }, '`true` value returns correct code and value');

	t.deepEqual(infer({
		age: 25
	}), {
		code: 200,
		json: {
			age: 25
		}
	}, 'object value returns correct code and value');

	t.deepEqual(infer({
		code: 400,
		message: 'Invalid'
	}), {
		code: 400,
		message: 'Invalid'
	}, 'code and message pair returns correct code and value');

	var ps = pull.values([ 'a', 'b', 'c' ]);

	t.deepEqual(infer(ps), {
		code: 200,
		json: ps
	}, '`pull-stream` value returns correct code and value');
});
