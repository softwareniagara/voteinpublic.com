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
      , hm
      , geocoder = new google.maps.Geocoder();
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
              shadow: pinShadow,
              yesVotes: node.yes,
              noVotes: node.no
            }); 
          
          mrks.push(marker);
          hmDat.push({
              location: latLng, weight: node.yes + node.no
            });
          bnds.extend(latLng);

          // map marker click event
          google.maps.event.addListener(marker, 'click', function() {
            item = this;
            var location = ''
              , answerCount = this.yesVotes + this.noVotes
              , yesWidth = roundNumber(this.yesVotes / answerCount * 100, 2)
              , noWidth = roundNumber(this.noVotes / answerCount * 100, 2)
              , html = ''; 
            geocoder.geocode({'latLng': this.getPosition()}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  location = results[1].address_components[0].short_name + ', ' + results[1].address_components[2].short_name;
                }
              }

              /*
              * If we do not want a to get geocoding location take the below code and remove location references.
              * Delete the geocode references above as well.
              */
              if (location) {
                html += location + '<br>';
              }
              html += '<strong>Yes:</strong> ' + yesWidth + '% / <strong>No:</strong> ' + noWidth + '%';
              var statusBar = $('#status-bar');
              statusBar.html(html);
              statusBar.show(); 
            });
          });
        }
        
        map.fitBounds(bnds);
        map.setZoom(map.getZoom()-1)
        hm = new google.maps.visualization.HeatmapLayer({data: hmDat, radius: 50});
        hm.setMap(map);
      }
    });

  })(jQuery);
}
window.onload = ginit;

function roundNumber(num, dec) {
  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  return result;
}
