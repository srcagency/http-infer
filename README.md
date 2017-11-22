# http-infer

Convert a simple return value from a route function into a description of a
http response. The response is of the format accepted by
[http-tell](https://github.com/srcagency/http-tell).

```js
infer(value) -> {
	// headers
	code,
	message,
	headers,

	// body
	json,
	raw,
};
```

Return values are interpreted as:

- `undefined` will by translated into a `204` (`No content`) http response
- Any object with a `code` property will be thought to be a valid response
  definition and is therefore returned as is
- Any other value will be wrapped as `{ code: 200, json: value }`

## Examples

```js
var infer = require('http-infer');
var tell = require('http-tell');

http.createServer(function( request, response ){
	tell(response, infer())
		.then(() => console.log('Completed a 200 request without content'));
})
	.listen(8000);
```

Streaming JSON:

```js
var infer = require('http-infer');
var tell = require('http-tell');
var pull = require('pull-stream');

http.createServer(function( request, response ){
	tell(response, infer(pull.values([ 'a', 'b', 'c' ])))
		.then(() => console.log('Streamed all values to the client'));
})
	.listen(8000);
```

"Pass through" objects with a `code`

```js
var infer = require('http-infer');
var tell = require('http-tell');

http.createServer(function( request, response ){
	tell(response, infer({
		code: 400,
		json: { error: 'Something bad' },
	}))
		.then(() => console.log('Send a 400 response'));
})
	.listen(8000);
```
