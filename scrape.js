Ruby.require('open-uri')
Johnson.require('init')

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
    return eval(Ruby.open(url, credentials).read())
  },

  store: function(){
    var retrieved = this.retrieve()
    for(var reply in retrieved){
      Ruby.puts(retrieved[reply]['text'])
    }
  }
}
  