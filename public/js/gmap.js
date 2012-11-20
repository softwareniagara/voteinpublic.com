function ginit() {
  (function($) {
    var qid  = $('[data-question-id]').data('question-id')
      , map  = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: new google.maps.LatLng(43.172994, -79.236745),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })
      , mrks = []
      , bnds = new google.maps.LatLngBounds();
    $.ajax('/results/'+qid+'/clustered', {
      success: function(data) {
        for (var i = 0, max = data.length; i < max; i++) {
          var node   = data[i]
            , latLng = new google.maps.LatLng(node.coordinates[0], node.coordinates[1])
            , marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: 'Yes: ' + node.yes + ', No: ' + node.no
              }); 
          
          mrks.push(marker);
          bnds.extend(latLng);
        }
        map.fitBounds(bnds);
      }
    });
  })(jQuery);
}
window.onload = ginit;
