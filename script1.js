// Script1.js
// Tony Goss COMP20 HW2
// MBTA

// var map;
// var mapOptions = {
//     center: {lat: 42.352271, lng: -71.05524200000001},
//     zoom: 11
// }


var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // // Define station coordinates 
  // var SouthStation = new google.maps.Marker({
  //   position: {lat: 42.352271, lng: -71.05524200000001},
  //   title: "South Station",
  //   icon: 'train.png'
  // });
  
  // var Andrew = new google.maps.Marker({
  //   position: {lat: 42.330154, lng: -71.057655},
  //   title: "Andrew Station",
  //   icon: 'train.png'
  // });
  // var PorterSquare = new google.maps.Marker({
  //   position: {lat: 42.3884, lng: -71.11914899999999},
  //   title: "Porter Square Station",
  //   icon: 'train.png'
  // });
  // var HarvardSquare = new google.maps.Marker({
  //   position: {lat: 42.373362, lng: -71.118956},
  //   title: "Harvard Square Station",
  //   icon: 'train.png'
  // });     
  // var JFKUMass = new google.maps.Marker({
  //   position: {lat: 42.320685, lng: -71.052391},
  //   title: "JFK/UMass Station",
  //   icon: 'train.png'
  // });  
  // var SavinHill = new google.maps.Marker({
  //   position: {lat: 42.31129, lng: -71.053331},
  //   title: "Savin Hill Station",
  //   icon: 'train.png'
  // });  
  // var ParkStreet = new google.maps.Marker({
  //   position: {lat: 42.35639457, lng: -71.0624242},
  //   title: "Park Street Station",
  //   icon: 'train.png'
  // });
  // var Broadway = new google.maps.Marker({
  //   position: {lat: 42.342622, lng: -71.056967},
  //   title: "Broadway Station",
  //   icon: 'train.png'
  // });
  // var NorthQuincy = new google.maps.Marker({
  //   position: {lat: 42.275275, lng: -71.029583},
  //   title: "North Quincy Station",
  //   icon: 'train.png'
  // });
  // var Shawmut = new google.maps.Marker({
  //   position: {lat: 42.29312583, lng: -71.06573796000001},
  //   title: "Shawmut Station",
  //   icon: 'train.png'
  // });
  // var Davis = new google.maps.Marker({
  //   position: {lat: 42.39674, lng: -71.121815},
  //   title: "Davis Station",
  //   icon: 'train.png'
  // });
  // var Alewife = new google.maps.Marker({
  //   position: {lat: 42.395428, lng: -71.142483},
  //   title: "Alewife Station",
  //   icon: 'train.png'
  // });
  // var KendallMIT = new google.maps.Marker({
  //   position: {lat: 42.36249079, lng: -71.08617653},
  //   title: "Kendall/MIT Station",
  //   icon: 'train.png'
  // });
  // var CharlesMGH = new google.maps.Marker({
  //   position: {lat: 42.361166, lng: -71.070628},
  //   title: "Charles/MGH Station",
  //   icon: 'train.png'
  // });
  // var DowntownCrossing = new google.maps.Marker({
  //   position: {lat: 42.355518, lng: -71.060225},
  //   title: "Downtown Crossing Station",
  //   icon: 'train.png'
  // });
  // var QuincyCenter = new google.maps.Marker({
  //   position: {lat: 42.251809, lng: -71.005409},
  //   title: "Quincy Center Station",
  //   icon: 'train.png'
  // });
  // var QuincyAdams = new google.maps.Marker({
  //   position: {lat: 42.233391, lng: -71.007153},
  //   title: "Quincy Adams Station",
  //   icon: 'train.png'
  // });
  // var Ashmont = new google.maps.Marker({
  //   position: {lat: 42.284652, lng: -71.06448899999999},
  //   title: "Ashmont Station",
  //   icon: 'train.png'
  // });
  // var Wollaston = new google.maps.Marker({
  //   position: {lat: 42.2665139, lng: -71.0203369},
  //   title: "Wollaston Station",
  //   icon: 'train.png'
  // });
  // var FieldsCorner = new google.maps.Marker({
  //   position: {lat: 42.300093, lng: -71.061667},
  //   title: "Fields Corner Station",
  //   icon: 'train.png'
  // });
  // var CentralSquare = new google.maps.Marker({
  //   position: {lat: 42.365486, lng: -71.103802},
  //   title: "Central Square Station",
  //   icon: 'train.png'
  // });
  // var Braintree = new google.maps.Marker({
  //   position: {lat: 42.2078543, lng: -71.0011385},
  //   title: "Braintree Station",
  //   icon: 'train.png'
  // });        

//   // Place markers on map
//   SouthStation.setMap(map);
//   Andrew.setMap(map);
//   PorterSquare.setMap(map);
//   HarvardSquare.setMap(map);
//   JFKUMass.setMap(map);
//   SavinHill.setMap(map);
//   ParkStreet.setMap(map);
//   Broadway.setMap(map);
//   NorthQuincy.setMap(map);
//   Shawmut.setMap(map);
//   Davis.setMap(map);
//   Alewife.setMap(map);
//   KendallMIT.setMap(map);
//   CharlesMGH.setMap(map);
//   DowntownCrossing.setMap(map);
//   QuincyCenter.setMap(map);
//   QuincyAdams.setMap(map);
//   Ashmont.setMap(map);
//   Wollaston.setMap(map);
//   FieldsCorner.setMap(map);
//   CentralSquare.setMap(map);
//   Braintree.setMap(map);

//   // Push markers on markerArray
//   markerArray.push(Alewife);
//   markerArray.push(Davis);
//   markerArray.push(PorterSquare);
//   markerArray.push(HarvardSquare);
//   markerArray.push(CentralSquare);
//   markerArray.push(KendallMIT);
//   markerArray.push(CharlesMGH);
//   markerArray.push(ParkStreet);
//   markerArray.push(DowntownCrossing);
//   markerArray.push(SouthStation);
//   markerArray.push(Broadway);
//   markerArray.push(Andrew);
//   markerArray.push(JFKUMass);
//   markerArray.push(NorthQuincy);
//   markerArray.push(Wollaston);
//   markerArray.push(QuincyCenter);
//   markerArray.push(QuincyAdams);
//   markerArray.push(Braintree);

//   for (var i = 0; i < markerArray.length; i++) {
//     var marker = markerArray[i];
//     // This is a global info window...
//     var infowindow = new google.maps.InfoWindow();
//     // Open info window on click of marker
//     google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(marker.title);
//     infowindow.open(map, marker);
//   });
//   }

//   // Push into 1st array
//   branch1landmarks.push(Alewife.position);
//   branch1landmarks.push(Davis.position);
//   branch1landmarks.push(PorterSquare.position);
//   branch1landmarks.push(HarvardSquare.position);
//   branch1landmarks.push(CentralSquare.position);
//   branch1landmarks.push(KendallMIT.position);
//   branch1landmarks.push(CharlesMGH.position);
//   branch1landmarks.push(ParkStreet.position);
//   branch1landmarks.push(DowntownCrossing.position);
//   branch1landmarks.push(SouthStation.position);
//   branch1landmarks.push(Broadway.position);
//   branch1landmarks.push(Andrew.position);
//   branch1landmarks.push(JFKUMass.position);
//   branch1landmarks.push(NorthQuincy.position);
//   branch1landmarks.push(Wollaston.position);
//   branch1landmarks.push(QuincyCenter.position);
//   branch1landmarks.push(QuincyAdams.position);
//   branch1landmarks.push(Braintree.position);

//   // Push into 2nd array
//   branch2landmarks.push(JFKUMass.position);
//   branch2landmarks.push(SavinHill.position);
//   branch2landmarks.push(FieldsCorner.position);
//   branch2landmarks.push(Shawmut.position);
//   branch2landmarks.push(Ashmont.position);

//   console.log(branch1landmarks);
//   console.log(branch2landmarks);



//   // Get location of user
//   getMyLocation();

//   var branch1 = new google.maps.Polyline({
//     path: branch1landmarks,
//     geodesic: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 3
//   });
//   branch1.setMap(map);

//   var branch2 = new google.maps.Polyline({
//     path: branch2landmarks,
//     geodesic: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 3
//   });
//   branch2.setMap(map);

// }

// function getMyLocation() {
//   if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
//     navigator.geolocation.getCurrentPosition(function(position) {
//       myLat = position.coords.latitude;
//       myLng = position.coords.longitude;
//       renderMap();
//     });
//   }
//   else {
//     alert("Geolocation is not supported by your web browser.  What a shame!");
//   }
// }

// function renderMap() {
//   me = new google.maps.LatLng(myLat, myLng);
//   // Update map and go there...
//   map.panTo(me);
  
//   // Create a marker
//   marker = new google.maps.Marker({
//     position: me,
//     title: "Here I Am!"
//   });
//   marker.setMap(map);
    
//   // Open info window on click of marker
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(marker.title);
//     infowindow.open(map, marker);
//   });
// }

