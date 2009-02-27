Johnson.environment = 'test'
Ruby.require('rubygems')
Ruby.gem('nokogiri')
Ruby.gem('taka')

// load this app
Johnson.require("init");

Johnson.require("test/jspec/helper");
Johnson.require("test/jspec/jspec");

Johnson.require('redgreen')