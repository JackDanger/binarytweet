
Jack.Action(/^\/$/,function() {

  var tweets = Flight.find('tweets', {}, {limit: 10, order: 'tweets.id DESC'})

  return render('home').call({tweets: tweets})
})


// low-priority route for serving public files
Jack.Action(/.*/, function(env, params) {
  var filename = Jack.root+'/public'+env['PATH_INFO']
  return Ruby.File.send("exist?", filename) ?
    [
      200,
      {'Content-Type': Ruby.Rack.Mime.mime_type(filename.match(/(\.[a-zA-Z0-9]+)$/)[1])},
      Ruby.File.read(filename)
    ] :
    Jack.not_found()
})
