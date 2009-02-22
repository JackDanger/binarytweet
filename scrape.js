Ruby.require('open-uri')

Scrape = {
  uri: "twitter.com/statuses/replies/",
  username: "binarial",
  password: Ruby.ENV['TWITTER_PASSWORD'],

  retrieve: function(){
    var url = 'http://'+this.uri+this.username+'.json';
    var credentials =
        Ruby.Hash.send("[]",
                       Johnson.symbolize('http_basic_authentication'),
                       [this.username, this.password]
                      )
    return Ruby.open(url, credentials).read()
  },
}
  