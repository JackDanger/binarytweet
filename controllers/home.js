
Jack.Action(/^\/$/,function() {

  var tweets = Flight.find('tweets', {}, 10)

  return render('home').call({tweets: tweets})
});