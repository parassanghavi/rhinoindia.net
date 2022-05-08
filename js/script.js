// JavaScript Document


  $('.bxslider').bxSlider({
  auto: true,
  
});

	$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});




$( ".js-contentToggle" ).contentToggle();

//$('.js-contentToggle').contentToggle({
// independent: false,
  //toggleOptions : {
    //duration: 400
 // }
//});


 // Define your locations: HTML content for the info window, latitude, longitude
    var locations = [
      ['<h4>Khatij Chem Pvt Ltd <p>Khajit Chem Private Limited 123, Ruturaj Society,Institute of Town Planner, B/h. Vishram Nagar, Off. Gurukul Road,  Memnagar,Ahmedabad-380052. Gujarat, India</p></h4>', 23.0544963, 72.5299796],
      ['<h4>Khatij Chem Pvt Ltd <p>Khajit Chem Private Limited 123, Ruturaj Society,Institute of Town Planner, B/h. Vishram Nagar, Off. Gurukul Road,  Memnagar,Ahmedabad-380052. Gujarat, India</p></h4>', 21.7278383,72.9686104],
      ['<h4>Khatij Chem Pvt Ltd <p>Khajit Chem Private Limited 123, Ruturaj Society,Institute of Town Planner, B/h. Vishram Nagar, Off. Gurukul Road,  Memnagar,Ahmedabad-380052. Gujarat, India</p></h4>', 20.7141181, 70.9695417],
      ['<h4>Khatij Chem Pvt Ltd <p>Khajit Chem Private Limited 123, Ruturaj Society,Institute of Town Planner, B/h. Vishram Nagar, Off. Gurukul Road,  Memnagar,Ahmedabad-380052. Gujarat, India</p></h4>', 22.7282461, 75.7832173],
      ['<h4>Khatij Chem Pvt Ltd <p>Khajit Chem Private Limited 123, Ruturaj Society,Institute of Town Planner, B/h. Vishram Nagar, Off. Gurukul Road,  Memnagar,Ahmedabad-380052. Gujarat, India</p></h4>', 18.8070645, 74.5313394]
    ];
    
    // Setup the different icons and shadows
    var iconURLPrefix = 'http://lab.i9webstudio.com/icons/';
    
    var icons = [
      iconURLPrefix + 'yello.png',
      iconURLPrefix + 'red.png',
      iconURLPrefix + 'grey.png',
      iconURLPrefix + 'lightgrey.png',
      iconURLPrefix + 'green.png'
    ]
    var iconsLength = icons.length;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(-37.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
	   scrollwheel: false,
      zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 260
    });

    var markers = new Array();
    
    var iconCounter = 0;
    
    // Add the markers and infowindows to the map
    for (var i = 0; i < locations.length; i++) {  
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: icons[iconCounter]
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
      iconCounter++;
      // We only have a limited number of possible icon colors, so we may have to restart the counter
      if(iconCounter >= iconsLength) {
      	iconCounter = 0;
      }
    }

    function autoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      for (var i = 0; i < markers.length; i++) {  
				bounds.extend(markers[i].position);
      }
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    autoCenter();