var showFlickr = function(tag) {
  var url = 'http://api.flickr.com/services/rest/?tags=' + tag;
  $.getJSON(url);
}

var calculateStats = function(month) {
  $('#stats').text('Statistics for ' + month);
}

var greeting = function() {
  $('#greeting').text('Hello!');
}
