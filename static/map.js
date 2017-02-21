			var myLat = 0;
			var myLng = 0;
			var parsed;
			var parsedObj;
			var myLogin = "BobOwens"
			var request = new XMLHttpRequest();
			var me = new google.maps.LatLng(myLat, myLng);
			var myOptions = {
				zoom: 13, // The larger the zoom number, the bigger the zoom
				center: me,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map;
			var marker;
			var infowindow = new google.maps.InfoWindow();
			function initMap()
			{
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				getMyLocation();
			}
			
			function getMyLocation() {
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						makeRequest();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}
			function renderMap()
			{
	
				for (var i = 0; i < parsedObj.length; i++) {
						user = new google.maps.LatLng(parsedObj[i]["lat"],parsedObj[i]["lng"]);
						distance = distanceGeo(parsedObj[i]["lat"], parsedObj[i]["lng"]);
						infoMessage = "<p>Login: "+parsedObj[i]["login"]+"</p>"+
									  "<p>Message: "+parsedObj[i]["message"]+"</p>"+
									  "<p>Distance: "+distance+" miles</p>";
						marker = new google.maps.Marker({
							position: user,
							title: infoMessage,
						});
						google.maps.event.addListener(marker, 'click', (function(marker, i) {
							return function() {
								infowindow.setContent(marker.title);
								infowindow.open(map, marker);
							}
						})(marker, i));
						marker.setMap(map);
				}
				me = new google.maps.LatLng(myLat, myLng);
				map.panTo(me);				
				// Create a marker
				marker = new google.maps.Marker({
					position: me,
					icon: "house.png",
					title: "HUHYEAHYUH"
				});
				marker.setMap(map);
					
				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});

			}
			//taken from http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
			function distanceGeo(lat2, lon2){
				Number.prototype.toRad = function() {
   					return this * Math.PI / 180;
				}

				var lat1 = myLat; 
				var lon1 = myLng; 

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
			function makeRequest(){
				var post = "login="+myLogin+"&lat="+myLat+"&lng="+myLng+"&message="+encodeURIComponent("HUHYEAHYUH Y'ALL");
				var infowindow = new google.maps.InfoWindow;
				var infoMessage;
				var distance;
				// request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
				request.open("POST", "http://fast-ravine-6301.herokuapp.com/sendLocation", true);
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.onreadystatechange = function(){
					if(request.readyState === 4 && request.status === 200){
						var response = request.responseText;
						console.log(response);
						parsedObj = JSON.parse(response);
						renderMap();
					}
				};
				request.send(post);
			};








// Will need to do geocoding at some point to lock in houses lat and longs
// var TuftsLat = 42.4055218;
// var TuftsLng = -71.12003240000001;
// var TuftsLatLng = new google.maps.LatLng(TuftsLat, TuftsLng);
// var mapOptions = {
//   zoom: 8,
//   center: TuftsLatLng,
//   mapTypeId: 'roadmap'
// };
// var map = new google.maps.Map(document.getElementById('map-campus'),
//     mapOptions);
// var parsed;
// var parsedObj;
// var request = new XMLHttpRequest();
// var me = new google.maps.LatLng(myLat, myLng);
// var myOptions = {
// 	zoom: 10, // The larger the zoom number, the bigger the zoom
// 	center: me,
// 	mapTypeId: google.maps.MapTypeId.ROADMAP
// };
// var map;
// var marker;
// var infowindow = new google.maps.InfoWindow();
// function init()
// {
// 	map = new google.maps.Map(document.getElementById("map_campus"), myOptions);
// 	map.panTo(me);
// 	marker = new google.maps.Marker({
// 		position: me,
// 		// icon: "house.png",
// 		title: "Tufts Campus Center"
// 	});
// 	marker.setMap(map);
// 	// getMyLocation();
// }

// function getMyLocation() {
// 	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
// 		navigator.geolocation.getCurrentPosition(function(position) {
// 			myLat = position.coords.latitude;
// 			myLng = position.coords.longitude;
// 			makeRequest();
// 		});
// 	}
// 	else {
// 		alert("Geolocation is not supported by your web browser.  What a shame!");
// 	}
// }
// function renderMap()
// {

// 	for (var i = 0; i < parsedObj.length; i++) {
// 			user = new google.maps.LatLng(parsedObj[i]["lat"],parsedObj[i]["lng"]);
// 			distance = distanceGeo(parsedObj[i]["lat"], parsedObj[i]["lng"]);
// 			infoMessage = "<p>Login: "+parsedObj[i]["login"]+"</p>"+
// 						  "<p>Message: "+parsedObj[i]["message"]+"</p>"+
// 						  "<p>Distance: "+distance+" miles</p>";
// 			marker = new google.maps.Marker({
// 				position: user,
// 				title: infoMessage,
// 			});
// 			google.maps.event.addListener(marker, 'click', (function(marker, i) {
// 				return function() {
// 					infowindow.setContent(marker.title);
// 					infowindow.open(map, marker);
// 				}
// 			})(marker, i));
// 			marker.setMap(map);
// 	}
// 	me = new google.maps.LatLng(myLat, myLng);
// 	map.panTo(me);				
// 	// Create a marker
// 	marker = new google.maps.Marker({
// 		position: me,
// 		icon: "house.png",
// 		title: "HUHYEAHYUH"
// 	});
// 	marker.setMap(map);
		
// 	// Open info window on click of marker
// 	google.maps.event.addListener(marker, 'click', function() {
// 		infowindow.setContent(marker.title);
// 		infowindow.open(map, marker);
// 	});

// }
//taken from http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
// function distanceGeo(lat2, lon2){
// 	Number.prototype.toRad = function() {
// 			return this * Math.PI / 180;
// 	}

// 	var lat1 = myLat; 
// 	var lon1 = myLng; 

// 	var R = 6371; // km 
// 	var x1 = lat2-lat1;
// 	var dLat = x1.toRad();  
// 	var x2 = lon2-lon1;
// 	var dLon = x2.toRad();  
// 	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
//     	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
//     	Math.sin(dLon/2) * Math.sin(dLon/2);  
// 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
// 	var d = R * c; 
// 	d /= 1.60934;
// 	return(d);
// }
// function makeRequest(){
// 	var post = "login="+myLogin+"&lat="+myLat+"&lng="+myLng+"&message="+encodeURIComponent("HUHYEAHYUH Y'ALL");
// 	var infowindow = new google.maps.InfoWindow;
// 	var infoMessage;
// 	var distance;
// 	// request.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
// 	request.open("POST", "http://fast-ravine-6301.herokuapp.com/sendLocation", true);
// 	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	request.onreadystatechange = function(){
// 		if(request.readyState === 4 && request.status === 200){
// 			var response = request.responseText;
// 			console.log(response);
// 			parsedObj = JSON.parse(response);
// 			renderMap();
// 		}
// 	};
// 	request.send(post);
// };