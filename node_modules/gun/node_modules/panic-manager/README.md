# Panic Manager
*Manage panic clients like a pro*

[![Travis branch](https://img.shields.io/travis/PsychoLlama/panic-manager/master.svg?style=flat-square)](https://travis-ci.org/PsychoLlama/panic-manager)
[![npm](https://img.shields.io/npm/v/panic-manager.svg?style=flat-square)](https://www.npmjs.com/package/panic-manager)
[![npm](https://img.shields.io/npm/dt/panic-manager.svg?style=flat-square)](https://www.npmjs.com/package/panic-manager)

Bored by documentation and just want runnable code? Here's the [quickstart](#quickstart).

## The problem
If you've used panic before, you know writing tests can be verbose and unwieldy, requiring lots of boilerplate just to get "Hello world" running.

If you're testing node processes, you've got to figure out how to spawn them (do you use `exec`, `spawn`, `execFile`, or `fork`?) get them to connect to your panic server (which requires another file and some way to pass the URL), and then if you need more processes, you've got to abstract that logic and make it reusable. Then you consider how much untested code you're writing.

Maybe you're testing across different computers, or you just want to see how the system works on a different platform. Fine, but you'll need to either:
1. Clone the tests onto the other machine.
2. Start the node process on that machine manually, each time you test.
3. Or automate it with a utility that starts processes remotely.

<dl>
<dt>Q: Who has time for all that??</dt>
<dd>A: Me</dd>
</dl>

## How it's solved
Panic-manager votes for option #3: automate it with a utility.

It provides a simple declarative API to spawn panic clients locally or remotely, and if you want to spread your clients over several machines, you can easily start a manager server on each, then remotely create or destroy them.

**Local clients**<br />
The manager spawns the requested clients as child processes.

**Remote clients**<br />
Panic-manager starts a websocket server on the remote machine. From your test dispatcher (panic-server), you connect to that remote process and tell it how many clients your test needs. Manager spins them up and points them back to you, where you can destroy them at your own whims.

**Is one harder?**<br />
No. It's almost exactly the same API.

## API
### `Manager`
`Manager` is a factory function. It's the only thing exported from `panic-manager`. What you pass it determines where processes will be created: on your machine, or remotely.

> The `Manager` factory can be used with or without the `new` keyword.

#### Pass it nothing
All calls to `.start` spawn clients from your process, not remotely.

It's used if you just need to create panic instances on your own machine. Can be used in addition to remote managers.

```js
import Manager from 'panic-manager'

// Create a new local panic manager.
const manager = Manager();

// Spawns a new child process, connecting it
// to the panic server listed.
manager.start({
	clients: [{ type: 'node' }],
	panic: 'http://localhost:8080',
})
```

#### Pass an `http.Server`
If given a server instance, it'll use [`socket.io`](http://socket.io/) to listen for incoming websocket requests on the `/panic-manager` route. Don't worry, all that is handled under the hood.

Starting the server allows others to remotely use your process for spawning and shutting down panic clients, kind of like a Selenium Server does.

```js
// Node's standard http library.
import { Server } from 'http'
import Manager from 'panic-manager'

// Create a new http server.
const server = Server()

// Attach the manager to that server.
const manager = Manager(server)

// Start listening on port 8080.
server.listen(8080)
```

#### Pass a `string`
When given a string, `Manager` will treat it as a url to a remote manager server and try to connect. The `/panic-manager` route is implied, don't try to pass it.

```js
import Manager from 'panic-manager'

// Connect to another manager process.
const manager = Manager('http://localhost:8080')

// url automatically resolves to:
// "http://localhost:8080/panic-manager"

// Starts a node process on the remote machine,
// connecting it to your panic address.
manager.start({
	clients: [{ type: 'node' }],
	panic: 'http://localhost:3000',
})
```

## Quickstart

> Although the examples prefer ES2015 syntax, most people aren't compiling server side. The following code is ES5.

```js
// Import the manager.
var Manager = require('panic-manager')

// Import panic.
var panic = require('panic-server')

// Create a new manager.
var manager = Manager()

// The panic server port number.
var port = 8080

// Start the panic server.
panic.server().listen(port)

manager.start({

	// The list of clients to create.
	clients: [{
		type: 'node',
	}],

	// Auto-connect to this panic server.
	panic: 'http://localhost:' + port,
})

// Print out clients as they join.
panic.clients.on('add', function (client, id) {
	console.log('New client (' + id + ') added.')
})
```

## Roadmap
- Add [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) support to start new browser instances that automatically connect to panic.

- Add remote selenium server support so you can tie it to [SauceLabs](https://saucelabs.com/), [BrowserStack](http://browserstack.com/), or your own selenium server.
