// HouseInfo
var LandlordProfile = React.createClass({
	generateInfo: function(){
		
	},
	render: function(){
		profile = this.generateInfo();
		landlordInfo = this.generateLandlordInfo();
		return(
			<ul className="HouseInfoList">
				{profile}
				{landlordInfo}
			</ul>
		);
	}
});
React.render(<LandlordProfile 
	LandlordFName={landlord.FirstName} LandlordLName={landlord.LastName} 
	LandlordEmail={landlord.Email} LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} Dist={house.DistFromCC}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets} />, 
	document.getElementById('HouseInfo'));
