var WelcomeComponent = React.createClass({
  render: function() {
    return (<h1>Post Your House</h1>);
  }
});

var AptForm = React.createClass ({
  
  handleSubmit: function(event) {
    alert('An apartment was uploaded!');
    event.preventDefault();
  },

  render: function() {
    return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Landlord Name
        <input type="text" name="name" /> <br/> 
      </label>

      <label>
        Address 1
        <input type="text" name="address1" /> <br/> 
      </label>

      <label>
        Address 2
        <input type="text" name="address2" /> <br/> 
      </label>

      <label> 
      City
      <select name = "City">
        <option value="Somerville">Somerville</option>
        <option value="Medford">Medford</option>
      </select><br/> 
    </label>
      <label> 
      State
      <select name = "State">
        <option value="Massachussetts">MA</option>
      </select><br/> 
    </label>      <label> 
      Country  
      <select name = "Country">
        <option value="United States of America">USA</option>
      </select><br/> 
    </label>
      <label>
        Zipcode
        <input type="text" name="zip" /> <br/> 
      </label>
    <label>
      Monthly rent 
      <input type="text" name ="rent"/> <br/> 
    </label>  

    <label> 
    Utilities included? 
    <select name = "utilities"> 
      <option value ="true">Yes</option>  
      <option value ="false">No</option> 
    </select><br/> 
    </label>

    <label> 
    Pets allowed? 
    <select name = "pets"> 
      <option value ="true">Yes</option>
      <option value ="false">No</option>
    </select> <br/> 
    </label>
 
      <label> 
      Bedrooms 
      <select name = "bedrooms">
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
      <select name = "parking">
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
    <select name = "utilities"> 
      <option value ="true">Yes</option>
      <option value ="false">No</option>
    </select><br/> 
    </label>
    <label> 
    Laundry included? 
    <select name = "laundryz"> 
      <option value ="true">Yes</option>
      <option value ="false">No</option>
    </select><br/> 
    </label>
    <input type="submit" value="Upload your house!"/>  </form>

    );
  }
});

React.render(
  <AptForm />,
  document.getElementById('root')
);

React.render(
  <WelcomeComponent />,
  document.getElementById('welcome')
);
