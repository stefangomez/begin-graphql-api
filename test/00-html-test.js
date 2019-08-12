let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/architect').sandbox

/**
 * Begin automatically sets these values to make publishing static sites faster and easier
 * Unset them in tests to ensure static files are read from the local filesystem, and not S3
 */
delete process.env.ARC_STATIC_BUCKET
delete process.env.ARC_STATIC_FOLDER

test('env', t => {
  t.plan(1)
  t.ok(sandbox, 'sandbox')
})

let end // saves a reference to be used later to shut down the sandbox
test('sandbox.start', async t => {
  t.plan(1)
  end = await sandbox.start()
  t.ok(end, 'opened')
})

// check for 200
test('get /', async t => {
  t.plan(1)
  try {
    var url = 'http://localhost:3333'
    var result = await tiny.get({url})
    t.ok(true, 'got result',console.log(result.toString().substring(50) + '...'))
  }
  catch(e) {
    t.fail(e)
    console.log(e.body)
  }
})

test('shut down the sandbox', t=> {
  t.plan(1)
  end()
  t.ok(true, 'shutdown successfully')
})
