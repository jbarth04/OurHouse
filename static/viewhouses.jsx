var WelcomeComponent =  React.createClass({
	render: function() {
		return (<h1>View Houses</h1>);
	}
});
var SingleListing = React.createClass({
	generateListing: function(){
		var listing = [];
		listing.push(<li className="info">{this.props.address}</li>);
		listing.push(<li className="info">{this.props.rooms} Bedrooms</li>);
		listing.push(<li className="info">${this.props.rent}/Month</li>);
		return listing;
	},
	handleClick: function(){
		var house = {house_id: this.props.id};
		window.location.href = "/house_profile="+this.props.id;
	},
    render: function() {
    	var listing = this.generateListing();
    	var house_id = this.props.id;
    	if(this.props.photo == undefined || this.props.photo == ""){
    		return (<div className={"houseListing"}>
        				<ul className={"houseInfo"} onClick={this.handleClick.bind()}>    					
        					{listing}
        				</ul>
        		</div>);
    	} else{
    		listingStyle = {
    			backgroundImage:'url(' + this.props.photo + ')',
    			backgroundRepeat: "no-repeat",
    			backgroundSize: "cover",
    			boxShadow: "0 0 200px rgba(0,0,0,0.9) inset",
    			color:"white"
       		}
    		return (<div className={"houseListing"} style={listingStyle}>
        				<ul className={"houseInfo"} onClick={this.handleClick.bind()}>    					
        					{listing}
        				</ul>
        		</div>);
    	}
    }
});
var HousesComponent = React.createClass({
	render: function() {
		var viewHouses = this.props.houses;
		if (this.props.showing == false){
			return(
				<div></div>
			);
		} else {
			return (
				<ul className="HouseList">
					{viewHouses.map((house) => <SingleListing key={house.id} photo={(this.props.photos.find(x => x.HouseId == house.Id)).PhotoUrl}
												address={house.Address1} rooms={house.Rooms} 
												parkingspots={house.ParkingSpots} rent={house.MonthlyRent}
												utilities={house.UtilitiesIncluded} laundry={house.Laundry}
												pets={house.Pets} id={house.Id} />)}
				</ul>
			);
		}
			
	}
});
var FilterForm = React.createClass({
	getInitialState: function() {
	    return {
	      MinRent: 0,
	      MaxRent: 10000000,
	      Dist: -1,
	      NumRooms: -1,
	      Laundry: -1,
	      Utilities: -1,
	      ParkingSpots: -1,
	      Pets: -1,
	      Houses:''
	    }
	    this.handleChange = this.handleChange.bind(this);
    	this.handleUpdate = this.handleUpdate.bind(this);
  	},
  	handleChange: function(key){
		return function(event){
			var state = {};
			state[key] = event.target.value;
			this.setState(state);
		}.bind(this);

  	},
	handleUpdate: function(event){
		this.UpdateHouses();
		event.preventDefault();
		
	},
	showFilters: function(event){
		this.props.showing = true;
		React.render(<FilterForm showing={true} houses={this.props.houses} photos={this.props.photos}/>, document.getElementById('filterbar'));
	},
	hideFilters: function(event){
		this.props.showing = false;
		React.render(<FilterForm showing={false} houses={this.props.houses} photos={this.props.photos} />, document.getElementById('filterbar'));	
	},
	UpdateHouses: function(){
		var filterHouses = [];
		var minRent = this.state.MinRent;
		var maxRent = this.state.MaxRent;
		var dist = this.state.Dist;
		var rooms = this.state.NumRooms;
		var laundry = this.state.Laundry;
		var utilities = this.state.Utilities;
		var parking = this.state.ParkingSpots;
		var pets = this.state.Pets;

		for (var i=0; i<houses.length; i++) {
			if (((houses[i].MonthlyRent <= maxRent) && (houses[i].MonthlyRent >= minRent)) &&
				(houses[i].DistFromCC == -1 || (houses[i].DistFromCC <= dist)) &&
				(houses[i].Rooms == -1 || (houses[i].Rooms == rooms)) &&
				(laundry == -1 || (houses[i].Laundry == laundry)) &&
				(utilities == -1 || (houses[i].Utilities == utilities)) &&
				(parking == -1 || (houses[i].ParkingSpots == parking)) &&
				(pets == -1 || (houses[i].Pets == pets))) {

				filterHouses.push(houses[i]);
			}
		}

		// TODO
		//for(var i=0;i<houses.length;i++){
		//	if((houses[i].MonthlyRent <= maxRent) && (houses[i].MonthlyRent >= minRent)){
		//		if(houses[i].DistFromCC <= dist){
		//			if(houses[i].Rooms == rooms){
		//				if(parking == -1 || houses[i].ParkingSpots == parking){
		//					filterHouses.push(houses[i]);
		//				}
		//			}
		//		}
		//	}
		//}

		this.props.houses = filterHouses;
		this.state.Houses = <HousesComponent houses={this.props.houses} photos={this.props.photos} showing={true}/>;
		HouseList = <HousesComponent houses={this.props.houses} photos={this.props.photos} showing={true}/>;
		var state = {Houses: HouseList};
		this.setState(state);
	},
	generateSubMenu: function(submenu){
		var submenu = submenu.map((item) => <option value={item.value}>{item.text}</option>);
		return submenu;
	},
	render: function() {
		if(this.props.showing == true){
			this.state.Houses = <HousesComponent houses={this.props.houses} photos={this.props.photos} showing={true}/>;
			return(
				<div className="sidebar">
					<div className="filterOptions">
						<a className="btn btn-red btn-xs" onClick={this.hideFilters.bind(this)}>
							Filters
							<span className="glyphicon glyphicon-chevron-up"></span>
						</a>
						<br/>
						<div className = "filterOption form-group">
							<label className="filterLabel">Minimum Rent</label>
							<select id="MinRent" value={this.state.MinRent} onChange={this.handleChange('MinRent')}>
							{this.generateSubMenu(filters.MinRent.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Maximum Rent</label>
							<select id="MaxRent" value={this.state.MaxRent} onChange={this.handleChange('MaxRent')}>
							{this.generateSubMenu(filters.MaxRent.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Distance from Campus Center</label>
							<select id="Distance" value={this.state.Dist} onChange={this.handleChange('Dist')}>
							{this.generateSubMenu(filters.Dist.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Number of Bedrooms</label>
							<select id="NumRooms" value={this.state.NumRooms} onChange={this.handleChange('NumRooms')}>
							{this.generateSubMenu(filters.NumRooms.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Laundry Included</label>
							<select id="Laundry" value={this.state.Laundry} onChange={this.handleChange('Laundry')}>
							{this.generateSubMenu(filters.Laundry.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Utilities Included</label>
							<select id="Utilities" value={this.state.Utilities} onChange={this.handleChange('Utilities')}>
							{this.generateSubMenu(filters.Utilities.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Parking Spots</label>
							<select id="ParkingSpots" value={this.state.ParkingSpots} onChange={this.handleChange('ParkingSpots')}>
							{this.generateSubMenu(filters.Parking.submenu)}
							</select>
						</div>
						<div className = "filterOption form-group">
							<label className="filterLabel">Pets</label>
							<select id="Pets" value={this.state.Pets} onChange={this.handleChange('Pets')}>
							{this.generateSubMenu(filters.Pets.submenu)}
							</select>
						</div>
						<button className="btn btn-red filter-btn" onClick={this.handleUpdate}>Update</button>
					</div>
					<div className="view-houses">
						{this.state.Houses}
					</div>
				</div>
			);
		} else {
			return(
				<a className="btn btn-red btn-xs" onClick={this.showFilters.bind(this)}>
					Filters
					<span className="glyphicon glyphicon-chevron-down"></span>
				</a>
			)
		}
			
	}
});
React.render(<WelcomeComponent />, document.getElementById('welcome'));
React.render(<FilterForm showing={true} houses={houses} photos={photos}/>, document.getElementById('filterbar'));