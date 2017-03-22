// HouseInfo
var HouseProfile = React.createClass({
	generateInfo: function(){
		info = [];
		if (this.props.Address2 !=''){
			info.push(<li>Address: {this.props.Address1}, {this.props.Address2}</li>);
		} else{
			info.push(<li>Address: {this.props.Address1}</li>)
		}
		var distance = Number((this.props.Dist).toFixed(3));
		info.push(<li>Distance from Campus Center: {distance}</li>);
		info.push(<li>Rent/Month: ${this.props.Rent}</li>);
		info.push(<li>Number of Bedrooms: {this.props.Rooms}</li>);
		if(this.props.Parking == 0){
			info.push(<li>No Parking Available</li>)
		} else {
			info.push(<li>Number of Parking Spots: {this.props.Parking}</li>);
		}
		if(this.props.Utilities == false){
			info.push(<li>Utilities Not Included</li>);
		} else{
			info.push(<li>Utilities Included</li>);
		}
		if(this.props.Laundry == false){
			info.push(<li>Laundry Not Included or Coin Operated</li>);
		} else{
			info.push(<li>Laundry Included</li>);
		}
		if(this.props.Pets == false){
			info.push(<li>No Pets Allowed</li>);
		} else {
			info.push(<li>Pets Allowed</li>);
		}
		return info;
	},
	generateLandlordInfo: function(){
		// landlordInfo = [];
		// landlordInfo.push(<p>{this.props.LandlordEmail}</p>);
		// landlordInfo.push(<p>{this.props.LandlordPhone}</p>);
		// return landlordInfo;
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
React.render(<HouseProfile 
	LandlordFName={landlord.FirstName} LandlordLName={landlord.LastName} 
	LandlordEmail={landlord.Email} LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} Dist={house.DistFromCC}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets} />, 
	document.getElementById('HouseInfo'));
