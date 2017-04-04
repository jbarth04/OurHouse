var Header = React.createClass({
  render: function() {
    return (<h1>List Your House on Our House!</h1>);
  }
});

var TuftsLat = 42.4055218;
var TuftsLng = -71.12003240000001;

var AptForm = React.createClass ({
  getInitialState: function() {
    return {
      landlordFName:'',
      landlordLName:'',
      landlordEmail:'',
      address1:'',
      address2:'',
      city:'Medford',
      state:'MA',
      country:'USA',
      zip:'',
      rent:'',
      utilities:'true',
      bedrooms:'1',
      parking:'0',
      pets:'true',
      laundry:'true',
      latitude:'',
      longitude:'', 
      disttocc:'',
      availableday:'1',
      availablemonth:'1',
      availableyear:'2017',
      leaseterm:'6'};

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
    var geocoder = new google.maps.Geocoder(); 
    var latitude;
    var longitude;
    var apartment = this.state;

    address = this.state.address1 + ' ' + this.state.address2 + ' ' + this.state.city + ' ' + this.state.state +' ' + this.state.zip; 
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) { 
      if (status == 'OK') {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        console.log(latitude, longitude); 
        console.log(apartment);


        Number.prototype.toRad = function() {
        return this * Math.PI / 180;
        }

        var lat1 = TuftsLat; 
        var lon1 = TuftsLng; 
        var lat2 = latitude;
        var lon2 = longitude;

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
        apartment.disttocc = d;
        apartment.latitude = lat2;
        apartment.longitude = lon2;  
        apartment.rent = parseFloat(apartment.rent);
        apartment.zip = apartment.zip;
        apartment.bedrooms = parseFloat(apartment.bedrooms);
        apartment.parking = parseFloat(apartment.parking);


        $.ajax({
        type: 'POST',
        url: '/newhome',
        data: apartment,
        success: function(result) {
          console.log(result);
          if(result[0].status == 200){
            alert('Thank you for uploading your apartment!');
            window.location.href = "/houses";
          }
          else if (result[0].status == 400){
            alert(result[0].message);
          }
          
        }
      })
      
      } else { 
        alert('We were unable to locate your property! Please doublecheck your address for accuracy.');
      }
    });
  
    event.preventDefault();
  },

  render: function() {
    return (
    <form onSubmit={this.handleSubmit} className="newPropForm">
      <p className="newPropLabel">Landlord Information</p>
      <div className="newPropFormLabel form-group">
        <label>
          Landlord First Name
        <input className="new-prop" type="text" value={this.state.landlord} onChange={this.handleChange('landlordFName')} /><br/>
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label>
          Landlord Last Name
        <input className="new-prop" type="text" value={this.state.landlord} onChange={this.handleChange('landlordLName')} /><br/>
        </label>
      </div><br />
      <div className="newPropFormLabel form-group">
        <label>
          Landlord Email
        <input className="new-prop" type="text" value={this.state.landlord} onChange={this.handleChange('landlordEmail')} /><br/>
        </label>
      </div>
      <p className="newPropLabel">Apartment Information</p>
      <div className="newPropFormLabel form-group">
        <label>
          Address 1
        <input className="new-prop" type="text" value={this.state.address1} onChange={this.handleChange('address1')} /><br/>
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label>
          Address 2
        <input className="new-prop" type="text" value={this.state.address2} onChange={this.handleChange('address2')} /><br/>
        </label>
      </div>
      <br />
      <div className="newPropFormLabel form-group">
        <label> 
          City
          <select className="new-prop" value={this.state.city} onChange={this.handleChange('city')}>
            <option value="Somerville">Somerville</option>
            <option value="Medford">Medford</option>
          </select><br/> 
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
          State
          <select className="new-prop" value={this.state.state} onChange={this.handleChange('state')}>
            <option value="Massachussetts">MA</option>
          </select><br/> 
        </label>
      </div>
      <div className="newPropFormLabel form-group">
        <label> 
          Country  
            <select className="new-prop" value={this.state.country} onChange={this.handleChange('country')}>
            <option value="United States of America">USA</option>
          </select><br/> 
        </label>
      </div>
      <div className="form-group">
        <label>
          Zipcode
          <input className="new-prop" type="text" value={this.state.zip} onChange={this.handleChange('zip')} /><br/>
        </label>
      </div>
      <div className="form-group">
        <label>
          Monthly rent 
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
      <br />
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
      <br />
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
    <input className="btn btn-primary"type="submit" value="Upload your house!"/>  
    </form>
    );
  }
});


React.render(
  <AptForm />,
  document.getElementById('root')
);


React.render(
  <Header />,
  document.getElementById('Header')
);
