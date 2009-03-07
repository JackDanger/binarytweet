#!/usr/bin/env jack

Johnson.require('init')

var render = function(template){
  Johnson.require("johnson/template")
  return Johnson.templatize(Ruby.File.read("views/"+template+".ejs"))
};

// low-priority route for serving public files
Jack.Action(/.*/, function(env, params) {
  var filename = Ruby.File.dirname(__FILE__)+'/public'+env['PATH_INFO']
  return Ruby.File.send("exist?", filename) ?
    [
      200,
      {'Content-Type': 'image/jpeg'},
      Ruby.File.read(filename)
    ] :
    Jack.not_found()
})

Jack.up()