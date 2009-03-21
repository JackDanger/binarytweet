
Jack.Action(/^\/flickr\.js/, function(){
  return ""+<r><![CDATA[

    var API_KEY = '3a26f36ac015fa09111911faeaf6eedc'

    randomizeArray = function(arr){
      var i = arr.length;
      while(--i) {
       var r = Math.floor( Math.random() * ( i + 1 ) );
       var tmp = arr[i]
       arr[i] = arr[r]
       arr[r] = tmp
      }
      return arr
    }

    loadPhotos = function(tags, destination){
      photo_src = function(photo, size){
        return  "http://farm" + photo.farm +
                ".static.flickr.com/" + photo.server +
                "/" + photo.id +
                "_" + photo.secret +
                (size ? "_" + size : '') +
                ".jpg"
      }
      $.getJSON(
          "http://api.flickr.com/services/rest/?"+
          "method=flickr.photos.search"+
          "&api_key="+API_KEY+
          "&tags="+randomizeArray(tags.split(","))[0]+
          "&format=json&jsoncallback=?",
          function (data) {
            var photos = randomizeArray(data.photos.photo)
            destination.each(function(){
              var photo = photos.shift()
              $(this).append(
                $("<img/>")
                  .attr("src", photo_src(photo, 's'))
              )
            })
          }
      );
    }
    $(function(){
      loadPhotos('no,zero,bad,awful,terrible,rancid,hate,suck,blast,stupid,dead,broken,trashed', $('.zero'))
      loadPhotos('yes,one,good,great,excellent,sweet,love,cool,beauty,smart,lively,working,clean', $('.one'))
    })
  ]]></r>;
})