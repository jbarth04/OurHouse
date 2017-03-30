var Header = React.createClass({
  render: function() {
    return (<h1>Edit Your House</h1>);
  }
});

var AptForm = React.createClass ({
  
  getInitialState: function() {
    return {
      landlordFName:landlord.FirstName,
      landlordLName:landlord.LastName,
      landlordEmail:landlord.Email,
      address1:house.Address1,
      address2:house.address2,
      city:house.City,
      state:house.State,
      country:house.Country,
      zip:house.Zipcode,
      rent:house.MonthlyRent,
      utilities:house.UtilitiesIncluded,
      bedrooms:house.Rooms,
      parking:house.ParkingSpots,
      pets:house.Pets,
      laundry:house.Laundry
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
    console.log("SUBMIT");
    houseid = house.Id;
    console.log(houseid);
    put_url = /house_profile_edit/+houseid;
    data = this.state;
    data.houseId = houseid;
    $.ajax({
        type: 'PUT',
        url: put_url,
        data: data,
        headers: {
            'Cache-Control': 'max-age=1000' 
        },
        success: function(result) {
          if(result[0].status == 200){
            window.location.href = "/houses";
          }
          else if (result[0].status == 400){
            alert(result[0].message);
          }
        }
      })
  
    event.preventDefault();
  },

  render: function() {
    return (
    <form onSubmit={this.handleSubmit} className="newPropForm">
      <p className="newPropLabel">Landlord Information</p>
      <p>{this.state.landlordFName} {this.state.landlordLName}</p>
      <p>House Info</p>
      <p>{this.state.address1} {this.state.address2} {this.state.city}, {this.state.state} {this.state.zip}</p>
      <div className="newPropFormLabel form-group">
        <label>
          Monthly Rent
        <input className="new-prop" type="text" value={this.state.rent} onChange={this.handleChange('rent')} /><br/>
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
        Pets allowed? 
          <select className="new-prop" value={this.state.pets} onChange={this.handleChange('pets')}>
            <option value ="true">Yes</option>
            <option value ="false">No</option>
          </select> <br/> 
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
        Bedrooms 
          <select className="new-prop" value={this.state.bedrooms} onChange={this.handleChange('bedrooms')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </label><br/>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
          Parking
          <select className="new-prop" value={this.state.parking} onChange={this.handleChange('parking')}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br/>
        </label> 
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
        Utilities included? 
        <select className="new-prop" value={this.state.utilities} onChange={this.handleChange('utilities')}>
          <option value ="true">Yes</option>
          <option value ="false">No</option>
        </select><br/> 
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
          Laundry included? 
          <select className="new-prop" value={this.state.laundry} onChange={this.handleChange('laundry')}> 
            <option value ="true">Yes</option>
            <option value ="false">No</option>
        </select><br/> 
        </label>
      </div>
      <input className="btn btn-xs btn-info"type="submit" value="Update"/>  
    </form>
    );
  }
});


React.render(
  <AptForm />,
  document.getElementById('HouseInfo')
);
