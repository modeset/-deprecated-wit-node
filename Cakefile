fs = require 'fs'
{exec} = require 'child_process'

task 'spec', 'run tests', (options) ->
  exec 'node_modules/jasmine-node/bin/jasmine-node spec', (err, stdout, stderr) ->
    console.log stdout + stderr
    throw err if err
