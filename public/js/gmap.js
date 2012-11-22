function ginit() {
  (function($) {
    var qid  = $('[data-question-id]').data('question-id')
      , map  = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: new google.maps.LatLng(43.172994, -79.236745),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })
      , mrks = []
      , hmDat = []
      , bnds = new google.maps.LatLngBounds()
      , hm;
    $.ajax('/results/'+qid+'/clustered', {
      success: function(data) {
        for (var i = 0, max = data.length; i < max; i++) {
          var node   = data[i]
            , latLng = new google.maps.LatLng(node.coordinates[0], node.coordinates[1])
            , pinColor
            , pinImage
            , pinShadow
            , marker;
            
          if (node.yes > node.no) {
            pinColor = "4B9646";
          } else if (node.no > node.yes) {
            pinColor = "964B46";
          } else {
            pinColor = "262626";
          }
            
          pinImage = new google.maps.MarkerImage(
            "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +   pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
          pinShadow = new google.maps.MarkerImage(
            "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));
            
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: 'Yes: ' + node.yes + ', No: ' + node.no,
              icon: pinImage,
              shadow: pinShadow
            }); 
          
          mrks.push(marker);
          hmDat.push({
              location: latLng, weight: node.yes + node.no
            });
          bnds.extend(latLng);
        }
        
        map.fitBounds(bnds);
        map.setZoom(map.getZoom()-1)
        hm = new google.maps.visualization.HeatmapLayer({data: hmDat, radius: 100});
        hm.setMap(map);
      }
    });
  })(jQuery);
}
window.onload = ginit;
