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
      landlord:'',
      address1:'',
      address2:'',
      city:'Medford',
      state:'MA',
      country:'USA',
      zip:'',
      rent:'',
      utilities:'true',
      bedrooms:'1',
      parking:'true',
      pets:'true',
      laundry:'true',
      latitude:'',
      longitude:'', 
      disttocc:''};

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
    alert('Thank you for uploading your apartment!');

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
          window.location.href = "/houses";
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
    <form onSubmit={this.handleSubmit}>

      <label>
        Landlord Name
      <input type="text" value={this.state.landlord} onChange={this.handleChange('landlord')} /><br/>
      </label>

      <label>
        Address 1
      <input type="text" value={this.state.address1} onChange={this.handleChange('address1')} /><br/>
      </label>

      <label>
        Address 2
      <input type="text" value={this.state.address2} onChange={this.handleChange('address2')} /><br/>
      </label>

      <label> 
        City
        <select value={this.state.city} onChange={this.handleChange('city')}>
          <option value="Somerville">Somerville</option>
          <option value="Medford">Medford</option>
        </select><br/> 
      </label>

      <label> 
        State
        <select value={this.state.state} onChange={this.handleChange('state')}>
          <option value="Massachussetts">MA</option>
        </select><br/> 
      </label>

      <label> 
        Country  
          <select value={this.state.country} onChange={this.handleChange('country')}>
          <option value="United States of America">USA</option>
        </select><br/> 
      </label>

      <label>
        Zipcode
        <input type="text" value={this.state.zip} onChange={this.handleChange('zip')} /><br/>
      </label>

      <label>
        Monthly rent 
        <input type="text" value={this.state.rent} onChange={this.handleChange('rent')} /><br/>
      </label>  

      <label> 
      Pets allowed? 
        <select value={this.state.pets} onChange={this.handleChange('pets')}>
          <option value ="true">Yes</option>
          <option value ="false">No</option>
        </select> <br/> 
      </label>
 
      <label> 
      Bedrooms 
        <select value={this.state.bedrooms} onChange={this.handleChange('bedrooms')}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </label><br/>

    <label> 
      Parking
      <select value={this.state.parking} onChange={this.handleChange('parking')}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select><br/>
    </label> 

    <label> 
    Utilities included? 
    <select value={this.state.utilities} onChange={this.handleChange('utilities')}>
      <option value ="true">Yes</option>
      <option value ="false">No</option>
    </select><br/> 
    </label>

    <label> 
      Laundry included? 
      <select value={this.state.laundry} onChange={this.handleChange('laundry')}> 
        <option value ="true">Yes</option>
        <option value ="false">No</option>
    </select><br/> 
    </label>

    <input type="submit" value="Upload your house!"/>  
    </form>
    );
  }
  //   distanceGeo: function(lat2, lon2){

  //   console.log(lat2);
  //   Number.prototype.toRad = function() {
  //       return this * Math.PI / 180;
  //   }

  //   var lat1 = TuftsLat; 
  //   var lon1 = TuftsLng; 

  //   var R = 6371; // km 
  //   var x1 = lat2-lat1;
  //   var dLat = x1.toRad();  
  //   var x2 = lon2-lon1;
  //   var dLon = x2.toRad();  
  //   var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
  //         Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
  //         Math.sin(dLon/2) * Math.sin(dLon/2);  
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  //   var d = R * c; 
  //   d /= 1.60934;
  //   return(d);

  // }
});


React.render(
  <AptForm />,
  document.getElementById('root')
);


React.render(
  <Header />,
  document.getElementById('Header')
);
