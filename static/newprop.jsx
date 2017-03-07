var Header = React.createClass({
  render: function() {
    return (<h1>List Your House on Our House!</h1>);
  }
});

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
      laundry:'true' };

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
});

React.render(
  <AptForm />,
  document.getElementById('root')
);

React.render(
  <Header />,
  document.getElementById('Header')
);
