// HouseInfo
var HouseProfile = React.createClass({
	generateInfo: function(){
		info = [];
		info.push(<li>Rent/Month: ${this.props.Rent}</li>);
		if (this.props.Address2 !=''){
			info.push(<li>Address: {this.props.Address1}, {this.props.Address2} {this.props.City}, {this.props.State}</li>);
		} else{
			info.push(<li>Address: {this.props.Address1} {this.props.City}, {this.props.State}</li>)
		}
		var distance = Number((this.props.Dist).toFixed(3));
		info.push(<li>Distance from Campus Center: {distance}</li>);
		info.push(<li>Number of Bedrooms: {this.props.Rooms}</li>);
		info.push(<li>Date Available: {this.props.DateAvailable}</li>);
		info.push(<li>Length of Lease: {this.props.LeaseTerm} months </li>);
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
	render: function(){
		profile = this.generateInfo();
		return(
			<ul className="HouseInfoList, NoBulletsList">
				{profile}
			</ul>
		);
	}
});

var ContactForm = React.createClass ({
  getInitialState: function() {
    return {
    	message:'Enter your email here.',
    	useremail:'',
    	landlordemail: this.props.LandlordEmail 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  },

  handleChange: function(key) {
    return function (event) {
      var state ={};
      state[key] = event.target.value;
      this.setState(state);
      }.bind(this);
  },

  handleSubmit: function(event) {

  	data = this.state;

    if (this.state.useremail != ''){ 
    	$.ajax({
    		type: 'POST',
    		url: '/contactlandlord',
    		data: data,
    		success: function(result){
    			if(result[0].status == 200) { 
    				alert('Your email is on its way!');
    			}
    			else if (result[0].status == 400) { 
    				alert('We were unable to send your email!')
    			}
    		}
    	})
    }
    event.preventDefault();
  },

  render: function() {
    return (
    <form onSubmit={this.handleSubmit} className="newPropForm">
      <p className="ContactForm">Express interest in this property!</p>
      <div className="newContactForm form-group">
        <label>
        Your Email Address
        <input className="send-email" type="text" value={this.state.useremail} onChange={this.handleChange('useremail')} /><br/>
        </label>
      </div> 
      <div className="newContactForm form-group">
        <label>
        <input className="send-email" type="textarea" value={this.state.message} onChange={this.handleChange('message')} /><br/>
        </label>
      </div> 
    <input className="btn btn-primary"type="submit" value="Contact this landlord!"/>  
    </form>
    );
  }
});

React.render(<HouseProfile 
	LandlordFName={landlord.FirstName} LandlordLName={landlord.LastName} 
	 LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} City={house.City} State={house.State}
	Dist={house.DistFromCC} Rooms={house.Rooms}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets}
	DateAvailable={house.DateAvailable} LeaseTerm={house.LeaseTerm} />, 
	document.getElementById('HouseInfo'));

React.render(<ContactForm LandlordEmail={landlord.Email}/>, document.getElementById('ContactForm'));
