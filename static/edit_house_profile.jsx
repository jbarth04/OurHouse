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
      laundry:house.Laundry,
      leaseterm:house.LeaseTerm, 
      dateavailable:house.DateAvailable
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
    houseid = house.Id;
    put_url = "/house_profile_edit="+houseid;
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
            relocation = "image_uploader=" + result[0].houseId;
            window.location=relocation;
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
    <form onSubmit={this.handleSubmit} className="newPropForm Form">
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
        <div className="newPropFormLabel form-group">
      <label> 
        Date available
        <select className="new-prop" value={this.state.availablemonth} onChange={this.handleChange('availablemonth')}> 
          <option value ="1">January</option> 
          <option value ="2">February</option> 
          <option value ="3">March</option> 
          <option value ="4">April</option> 
          <option value ="5">May</option> 
          <option value ="6">June</option> 
          <option value ="7">July</option> 
          <option value ="8">August</option> 
          <option value ="9">September</option> 
          <option value ="10">October</option> 
          <option value ="11">November</option> 
          <option value ="12">December </option> 
        </select>
        <select className="new-prop" value={this.state.availableday} onChange={this.handleChange('availableday')}> 
          <option value ="1">1</option> 
          <option value ="2">2</option> 
          <option value ="3">3</option> 
          <option value ="4">4</option> 
          <option value ="5">5</option> 
          <option value ="6">6</option> 
          <option value ="7">7</option> 
          <option value ="8">8</option> 
          <option value ="9">9</option> 
          <option value ="10">10</option> 
          <option value ="11">11</option> 
          <option value ="12">12</option> 
          <option value ="13">13</option> 
          <option value ="14">14</option> 
          <option value ="15">15</option> 
          <option value ="16">16</option> 
          <option value ="17">17</option> 
          <option value ="18">18</option> 
          <option value ="19">19</option> 
          <option value ="20">20</option> 
          <option value ="21">21</option> 
          <option value ="22">22</option> 
          <option value ="23">23</option> 
          <option value ="24">24</option> 
          <option value ="25">25</option> 
          <option value ="26">26</option> 
          <option value ="27">27</option> 
          <option value ="28">28</option> 
          <option value ="29">29</option> 
          <option value ="30">30</option> 
          <option value ="31">31</option> 
        </select> 
        <select className="new-prop" value={this.state.availableyear} onChange={this.handleChange('availableyear')}> 
          <option value ="2017">2017</option> 
          <option value ="2018">2018</option> 
          <option value ="2019">2019</option> 
        </select> 
      </label> 
      </div>
      <br />
      <div className="newPropFormLabel form-group">
        <label> 
          Lease Term  
          <select className="new-prop" value={this.state.leaseterm} onChange={this.handleChange('leaseterm')}> 
            <option value ="6">6 months</option>
            <option value ="12">12 months</option>
            <option value ="18">18 months</option>
            <option value ="24">24 months</option>
        </select><br/> 
        </label>
      </div>
      <br />
      <input type="submit" className="btn btn-red" value="Next"/>  
    </form>
    );
  }
});


React.render(
  <AptForm />,
  document.getElementById('HouseInfo')
);
