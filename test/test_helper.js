Johnson.environment = 'test'
Ruby.require('rubygems')
Ruby.gem('nokogiri')
Ruby.gem('taka')

// load this app
Johnson.require("init");
Ruby["$LOAD_PATH"].unshift(Ruby.File.dirname(__FILE__))

Johnson.require("test/jspec/helper");
Johnson.require("test/jspec/jspec");

Johnson.require('redgreen/redgreen')