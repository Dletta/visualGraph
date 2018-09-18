Panic Client
------------
Caters to the whims of panic-server.

[![npm](https://img.shields.io/npm/dt/panic-client.svg?style=flat-square)](https://www.npmjs.com/package/panic-client)
[![Travis branch](https://img.shields.io/travis/PsychoLlama/panic-client/master.svg?style=flat-square)](https://travis-ci.org/PsychoLlama/panic-client)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/amark/gun)
[![npm](https://img.shields.io/npm/v/panic-client.svg?style=flat-square)](https://www.npmjs.com/package/panic-client)

> These docs only cover the client API. An introduction to panic and the server API can be found [here](https://github.com/gundb/panic-server).

## Server API
Naturally, you wouldn't expect the server API to be in a repo named "panic-client".

You'd be right.

All the main API docs and cool, compelling reasons for using panic are in the [panic-server repo](https://github.com/gundb/panic-server).

## Loading panic-client
There are two ways! Because panic-client can be used (most) places JavaScript runs, there are a couple different ways you can load it.

### From a browser
When you start a panic server, it automatically handles routes hitting /panic.js. So from a browser, the simplest way is by including a script tag.

```html
<script src='http://localhost:8080/panic.js'></script>
```

Now you'll find a global variable, `panic`, in your browser.

Afterwards, you'll call `panic.server()`, but we'll get to that in a second...

> If you're using Selenium, the easiest way to inject panic is with `executeScript`, or a library that wraps it.

### From Node.js
Ah, this one's easier.

Panic-client is also on npm, so you can install it quickly like so:

```sh
$ npm install panic-client
```

> If you don't have npm, you can learn about it [here](https://docs.npmjs.com/getting-started/what-is-npm). It'll change your life.

Now simply `require` it from a JS file.

```js
var panic = require('panic-client')
```

### Connecting to panic-server
Now that you've loaded panic, give it the URL to your panic server. Naturally, you'll need to start it first.

```js
// Or whatever port/ip it's running on.
panic.server('http://localhost:8080')
```

Bam, you're connected.

## API
Okay, first let's clarify what this documentation describes.

When you call `panic.clients.run` from the panic-server code, that function is stringified and sent to the clients, running this code.

So any methods or properties you access within that function, that's the client API.

Cool. Now for the fun stuff.

### Parameters
You're just given one, and it's the same as the `this` context. Extra fancy if you're using an arrow function.

```js
clients.run(function (context) {
	this === context // yep
})
```

### Return values
Any value you return from a job will be reported back to panic-server, with the exception of a `Promise`.

```js
// Returning a primitive.
client.run(function () {
	return 5
}).then(function (result) {
	console.log(result) // 5
})
```

Since you returned a promise, it automatically switches into async mode and won't report back until the promise resolves or rejects.

```js
// Returning a promise.
client.run(function () {
	return fetch('/users.json')
	.then(function (res) {
		return res.json()
	})
}).then(function (users) {
	users // whatever those users were...
})
```

Though beware, if your promise rejects, the job will fail and reject on the server.

```js
client.run(function () {
	var error = new Error('KO!')
	return Promise.reject(error)
}).catch(function (error) {
	error.message // KO!
})
```

Last thing, promise.

If your return value can't be JSON.strungified, it'll just send back the type, like `[object Event]` as a best effort for debugging.

### Methods
#### `.async()`
Maybe you're a menace and you hate promises. That's fine, `.async` returns a `done` callback.

It won't report back to the server until you call it, throw an error, or explicitly fail the test.

Also, you can use `this.done` instead, they both reference the same function. Matter of convenience.

```js
clients.run(function () {
	var done = this.async()
	setTimeout(done, 15000)
}).then(function () {
	// 15 seconds later!
})
```

#### `.done()`
Reports the job back to the server immediately, sending it whatever value you pass. Unless of course `done` has already been called, 'cuz you've only got one shot kid.

Basically, the job can only finish or fail once. Any additional calls are just ignored.

#### `.fail()`
Manually fails a job. If you pass something that isn't an error object, it'll be used as the message in an error that panic generates, then it's sent off to the server and jobs reject it's just messy.

As with `.done`, calling `.done` or `.fail` after doesn't make any difference.

#### `.set()`
If you're running oodles of jobs, it's a matter of time until one job needs a variable another job created.

Rather than doing `global` hackery, you can use `.set`, which saves a key-value pair into an object, where it's accessible to other jobs (in the same process).

```js
client.run(function () {
	var port = this.props.port
	this.set('port', port)
}, { port: 8085 })
```

#### `.get()`
Retrieve values created in `.set`.

```js
// From the port example.
client.run(function () {
	var port = this.get('port')
	console.log(port) // 8085
})
```

### Properties
Here are some fancy things you have access to inside running jobs.

#### `.props`
You might have noticed you've only got one parameter. This raises an excellent question: will global warming really kill us all?

Additionally, how do you get variables into the job? Well, if you've dug around in the server API, you know `.run` takes two parameters, the function to run, and any variables it depends on.

Those variables are all accessible via `.props`.

```js
client.run(function () {
	var color = this.props.background
	color // orange
}, {
	background: 'orange'
})
```

#### `.platform`
This property references the [platform.js](https://github.com/bestiejs/platform.js/) object. It's used internally with panic, and useful, so why not expose it? :tada:

#### `.isAsync`
A boolean, which refers to whether `.async()` has been called, and consequently, whether your job is asynchronous.

## Getting support
If you've got questions or need help, either swing by [our gitter channel](https://gitter.im/amark/gun/) and ask for @PsychoLlama, or post an issue.

## Supporting us
- Tell your friends how cool we are
- Help us get to 5 million GitHub stars by adding yours
- Report any bugs you find

Any of those would be terrific.



<!---->
