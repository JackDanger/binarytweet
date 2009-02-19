#!/usr/bin/env jack

var render = function(template){
  Johnson.require("johnson/template")
  return Johnson.templatize(Ruby.File.read("views/"+template+".ejs"))
};

Jack.up()