
Jack.Action(/^\/flickr\.js/, function(){
  return ""+<r><![CDATA[

    var API_KEY = '3a26f36ac015fa09111911faeaf6eedc'

    randomizeTags = function(tagString){
      var tags = tagString.split(",")
      var i = tags.length;
      while(--i) {
       var r = Math.floor( Math.random() * ( i + 1 ) );
       var tmp = tags[i]
       tags[i] = tags[r]
       tags[r] = tmp
      }
      return tags
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
          "&tags="+randomizeTags(tags)+
          "&format=json&jsoncallback=?",
        function (data) {
          $.each(data.photos.photo, function (_, photo){
            $(destination.shift())
              .append(
                $("<img/>")
                  .attr("src", photo_src(photo, 's'))
              )
          });
        }
      );
    }
    $(function(){
      loadPhotos('no,zero,bad,awful,terrible,rancid,hate,suck,blast,stupid,dead,broken,trashed', $('.zero .photo'))
      loadPhotos('yes,one,good,great,excellent,sweet,love,cool,beauty,smart,lively,working,clean', $('.one .photo'))
    })
  ]]></r>;
})