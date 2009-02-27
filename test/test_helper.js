Johnson.environment = 'test'
Ruby.require('rubygems')
Ruby.gem('nokogiri')
Ruby.gem('taka')

// load this app
Johnson.require("init");

Johnson.require("test/jspec/helper");
Johnson.require("test/jspec/jspec");


// Make the jspec just barely readable
// Code largely ported from RedGreen

// Johnson has trouble reading escape characters
// from the Javascript end
Ruby.require('ruby_escape')

color = function(hue, fn, binding){
  COLORS = {clear: 0, red: 31, green: 32, yellow: 33}

  var change = function(to){
    Ruby.print(Ruby.String.escape()+"["+COLORS[to]+'m')
  }

  return function(){
    change(hue)
    try {
      ret = fn.apply(binding, arguments)
    }
    finally {
      change('clear')
    }
    return ret
  }
}

$.extend(console,{
  warn:  color('yellow', console.warn, console),
  error: color('red',    console.error, console)
  info:  color('green',  console.error, console)
})
