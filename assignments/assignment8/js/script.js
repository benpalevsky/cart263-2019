function getImage() {
  var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickerAPI, {
    tags: "juventus",
    tagmode: "any",
    format: "json"
  }).done(function(data) {
    var random = Math.floor(Math.random() * data.items.length);
    $('img').attr('src', data.items[random].media.m);
  });
}
