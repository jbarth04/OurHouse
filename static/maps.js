/* Lat and Lng of Tufts Mayer Campus Center */
var TuftsLat = 42.4055218;
var TuftsLng = -71.12003240000001;
var TuftsLatLng = new google.maps.LatLng(TuftsLat, TuftsLng);
var infowindow = new google.maps.InfoWindow();
var mapOptions = {
		zoom: 15,
		center: TuftsLatLng,
		mapTypeId: 'roadmap'
};
var map = new google.maps.Map(document.getElementById('map-campus'),
							  mapOptions);
var marker = new google.maps.Marker({
		position: TuftsLatLng,
		map: map
});
var house;

/* Creates markers for all of the houses from the database */
for (var i = 0; i < houses.length; i++) {
	house = new google.maps.LatLng(houses[i].Latitude, houses[i].Longitude);
	distance = distanceGeo(houses[i].Latitude, houses[i].Longitude);
	infoMessage = "<p>Address: "+ houses[i].Address1 + houses[i].Address2 + houses[i].City + "<br>" + houses[i].State + ", " + houses[i].Zipcode + "</p>"+
				  "<p>Bedrooms: "+houses[i].Rooms+"</p>"+
				  "<p>Distance: "+distance+" miles</p>";
	marker = new google.maps.Marker({
		position: house,
		title: infoMessage
	});
	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(marker.title);
			infowindow.open(map, marker);
		}
	})(marker, i));
	marker.setMap(map);
}
/* Function to calculate distance between Tufts CC and house */
function distanceGeo(lat2, lon2){
		Number.prototype.toRad = function() {
				return this * Math.PI / 180;
		}

		var lat1 = TuftsLat; 
		var lon1 = TuftsLng; 

		var R = 6371; // km 
		var x1 = lat2-lat1;
		var dLat = x1.toRad();  
		var x2 = lon2-lon1;
		var dLon = x2.toRad();  
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
        	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
        	Math.sin(dLon/2) * Math.sin(dLon/2);  
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; 
		d /= 1.60934;
		return(d);
}