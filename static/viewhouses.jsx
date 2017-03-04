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
			var viewHouses = this.props.value;
			if (viewHouses.length == 0){
				return(
					<div>
						<h2>Sorry, there are no houses available</h2>
					</div>
				);
			} else {
				return (
    				<tbody>
    					{viewHouses.map((house) => <SingleListing key={house.id} rooms={house.Rooms} parkingspots={house.ParkingSpots} rent={house.MonthlyRent} utilities={house.UtilitiesIncluded} laundry={house.Laundry} pets={house.Pets} />)}
					</tbody>
			);
			}
			
		}
});
var FilterForm = React.createClass({
	getInitialState: function() {
	    return {
	      MinRent: 500,
	      MaxRent: 1000,
	      Dist: 0.1,
	      NumRooms: 1,
	      Laundry: true,
	      Utilities: true,
	      ParkingSpots: 0
	    }
  	},
  	handleChange: function(key){
		return function(event){
			var state = {};
			state[key] = event.target.value;
			this.setState(state);
		}.bind(this);
  	},
	handleUpdate: function(event){
		console.log("HIT");
		this.UpdateHouses();
		event.preventDefault();
	},
	UpdateHouses: function(){
		var filterHouses = [];
		var minRent = this.state.MinRent;
		var maxRent = this.state.MaxRent;
		var dist = this.state.Dist;
		var rooms = this.state.NumRooms;
		var parking = this.state.ParkingSpots;
		for(var i=0;i<houses.length;i++){
			if(houses[i].MonthlyRent <= maxRent && houses[i].MonthlyRent >= minRent){
				if(houses[i].Dist <= dist){
					if(houses[i].Rooms == rooms){
						if(houses[i].ParkingSpots == parking || parking == -1){
							filterHouses.push(houses[i]);
						}
					}
				}
			}
		}
		React.render(<HousesComponent value={filterHouses}/>, document.getElementById('view-houses'));
	},
	generateSubMenu: function(submenu){
		var submenu = submenu.map((item) => <option value={item.value}>{item.text}</option>);
		return submenu;
	},
	render: function() {
		return(
			<div className="filterOptions">
				<div className = "filterOption">
					<label>Minimum Rent</label>
					<select id="MinRent" value={this.state.MinRent} onChange={this.handleChange('MinRent')}>
					{this.generateSubMenu(filters.MinRent.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Maximum Rent</label>
					<select id="MaxRent" value={this.state.MaxRent} onChange={this.handleChange('MaxRent')}>
					{this.generateSubMenu(filters.MaxRent.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Distance from Campus Center</label>
					<select id="Distance" value={this.state.Dist} onChange={this.handleChange('Dist')}>
					{this.generateSubMenu(filters.Dist.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Number of Bedrooms</label>
					<select id="NumRooms" value={this.state.NumRooms} onChange={this.handleChange('NumRooms')}>
					{this.generateSubMenu(filters.NumRooms.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Laundry Included</label>
					<select id="Laundry" value={this.state.Laundry} onChange={this.handleChange('Laundry')}>
					{this.generateSubMenu(filters.Laundry.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Utilities Included</label>
					<select id="Utilities" value={this.state.Utilities} onChange={this.handleChange('Utilities')}>
					{this.generateSubMenu(filters.Utilities.submenu)}
					</select>
				</div>
				<div className = "filterOption">
					<label>Parking Spots</label>
					<select id="ParkingSpots" value={this.state.ParkingSpots} onChange={this.handleChange('ParkingSpots')}>
					{this.generateSubMenu(filters.Parking.submenu)}
					</select>
				</div>
				<button onClick={this.handleUpdate}>Update</button>
			</div>
		);
		
	}
});
React.render(<WelcomeComponent />, document.getElementById('welcome'));
React.render(<HousesComponent value={houses}/>, document.getElementById('view-houses'));
React.render(<FilterForm />, document.getElementById('filterbar'));