
Jack.Action(/^\/$/,function() {

  var tweets = Flight.find('tweets', {}, 10)

  return render('home').call({tweets: tweets})
})


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
