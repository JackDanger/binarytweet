Ruby.require('open-uri')
Johnson.require('init')


var bogus_reply = ""+<r><![CDATA[
[
  {
    "user": {
      "name": "Jack Danger Canty",
      "url": "http:\/\/6brand.com",
      "id": 3496901,
      "description": "Making new things every day.",
      "protected": false,
      "screen_name": "jackdanger",
      "followers_count": 169,
      "location": "Seattle",
      "profile_image_url": "http:\/\/s3.amazonaws.com\/twitter_production\/profile_images\/55870974\/Photo_171_cropped_normal.jpg"
    },
    "favorited": false,
    "truncated": false,
    "text": "@binarial 1",
    "id": 1234733638,
    "in_reply_to_status_id": null,
    "in_reply_to_user_id": 21141440,
    "source": "<a href=\"http:\/\/iconfactory.com\/software\/twitterrific\">twitterrific<\/a>",
    "in_reply_to_screen_name": "binarial",
    "created_at": "Sat Feb 21 17:57:43 +0000 2009"
  }
]
]]></r>;


Scrape = (function(){
  var uri = "twitter.com/statuses/replies/"
  var username = "binarial"
  var password = Ruby.ENV['TWITTER_PASSWORD']

  var retrieve = function(){
    var url = 'http://'+uri+username+'.json';
    var credentials =
        Ruby.Hash.send("[]",
                       Johnson.symbolize('http_basic_authentication'),
                       [username, password]
                      )
    return eval(Ruby.open(url, credentials).read())
  }

  var run = function(){
    Flight.debug = true
    var retrieved = retrieve()
    for each(var reply in retrieved){
      var match = (reply.text).match(/^(@[0-9a-zA-Z]+):? (0|1)\s*$/)
      if(match && match[2]){
        user  = {name: reply.user.screen_name}
        tweet = {user: reply.user.screen_name, text: match[1]+' '+match[2], id: reply.id}
        Flight.find('users', user)   || Flight.create('users', user)
        Flight.find('tweets', tweet) || Flight.create('tweets', tweet)
     }
    }
  }
  return {
    run: run
  }
})()

Scrape.run()
