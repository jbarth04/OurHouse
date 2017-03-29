var Header = React.createClass({
  render: function() {
    return (<h1>Edit Your House</h1>);
  }
});

var AptForm = React.createClass ({
  
  getInitialState: function() {
    return {
      landlordFName:'',
      landlordLName:'',
      landlordEmail:'',
      address1:house.Address1,
      address2:house.address2,
      city:house.City,
      state:house.State,
      country:house.Country,
      zip:house.Zipcode,
      rent:house.Rent,
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
