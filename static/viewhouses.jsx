var WelcomeComponent =  React.createClass({
	render: function() {
		return (<h1>View Houses</h1>);
	}
});
var SingleListing = React.createClass({
	generateListing: function(){
		var listing = [];
		listing.push(<li className="info">Bedrooms: {this.props.rooms}</li>);
		listing.push(<li className="info">Monthly Rent: ${this.props.rent}</li>);
		listing.push(<li className="info">Parking Spots: {this.props.parkingspots}</li>);
		if(this.props.utilities == true){
			listing.push(<li className="info">Utilities are included</li>);
		} else {
			listing.push(<li className="info">Utilities are not included</li>);
		}
		if(this.props.laundry == true){
			listing.push(<li className="info">Laundry is included</li>);
		} else {
			listing.push(<li className="info">Laundry not included</li>);
		}
		if(this.props.pets == true){
			listing.push(<li className="info">Pets allowed</li>);
		} else {
			listing.push(<li className="info">Not pets allowed</li>);
		}
		return listing;
	},
    render: function() {
    	var listing = this.generateListing();
        return (<div className={"houseListing"}>   
        			<ul className={"houseInfo"}>    					
        			{listing}
        			</ul>
        		</div>);
    }
});
var HousesComponent = React.createClass({
	render: function() {
			return (
    			<tbody>
    				{houses.map((house) => <SingleListing key={house.id} rooms={house.Rooms} parkingspots={house.ParkingSpots} rent={house.MonthlyRent} utilities={house.UtilitiesIncluded} laundry={house.Laundry} pets={house.Pets} />)}
				</tbody>
			);
		}
});

var FilterBar = React.createClass({
	generateItem:function(item){
		return (<FilterBarMenu text={item.text} url={item.url} submenu={item.submenu} />);
	},
	render:function(){
		var items = filter_types.map(this.generateItem);
		return (
			<ul>
			{items}
			<button id="update-button" onClick={updateHouses}>Update</button>
			</ul>);
	}
});
var FilterBarMenu = React.createClass({
	generateMenu:function(){
		var submenuArr = this.props.submenu;
		var submenu = submenuArr.map((item) => <option value={item.value}>{item.value}</option>);
		return submenu;
	},
	render:function() {
		var menu = this.generateMenu();
		return (<div className="filter-option">
					{this.props.text}
					<select id={this.props.text}>
						{menu}
					</select>
				</div>);
	}
});
React.render(<WelcomeComponent />, document.getElementById('welcome'));
React.render(<HousesComponent />, document.getElementById('view-houses'));
React.render(<FilterBar />, document.getElementById('filterbar'));
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
for (var i = 0; i < houses.length; i++) {
	house = new google.maps.LatLng(houses[i].Lat, houses[i].Lng);
	distance = distanceGeo(houses[i].Lat, houses[i].Lng);
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
function updateHouses(){
	// TODO: sort houses	
}