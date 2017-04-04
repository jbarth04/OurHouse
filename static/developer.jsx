var KeyForm = React.createClass ({
  
  getInitialState: function() {
    return {
      ProjectName:'',
      Email:''};

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

  handleSubmit: function(event){
      data = this.state;
      $.ajax({
        type: 'POST',
        url: '/generateAPIkey',
        data: data,
        success: function(result) {
          if(result[0].status == 201){
            message = "Your API Key for OurHouse is : " + result[0].key;
            alert(message);
          }
          else if (result[0].status == 400){
            alert(result[0].message);
          }
        }
      })
      event.preventDefault();
  },

  render: function() {
    console.log("got called");
    return (
    <form onSubmit={this.handleSubmit} className="newPropForm">
      <p className="newPropLabel">Get API Key</p>
        <div className="newPropFormLabel form-group">
          <label>
            Project Title:
            <input className="new-prop" type="text" value={this.state.ProjectName} onChange={this.handleChange('ProjectName')} /><br/>
          </label>
        </div>
        <div className="newPropFormLabel form-group">
          <label>
            Email
          <input className="new-prop" type="text" value={this.state.Email} onChange={this.handleChange('Email')} /><br/>
          </label>
        </div>
      <input className="btn btn-primary"type="submit" value="Generate"/>  
    </form>
    );
  }
});
var Developer = React.createClass ({
  
  getInitialState: function() {
    return{
      buttonClicked:false,
      keyForm:''
    }
    this.handleClick = this.handleClick.bind(this);
  },
  handleClick: function(event){
    this.setState({buttonClicked: true});
    generateKey = <KeyForm />;
    this.setState({keyForm: generateKey});
    this.render();
      
    event.preventDefault();
  },
  render: function() {
    form = this.state.keyForm;
    return (
      <div className="APIContents">
        <h1>OurHouse API</h1>
        <h3>Welcome to the OurHouse API! The OurHouse REST API allows developers to collect data from the OurHouse database. We hope that you will be able to user our API to collect important data about off-campus housing around Tufts University! You’ll need an API key to get started.</h3>
        <p>For a new API key, click below:</p>
        <a className="btn btn-sm btn-default" onClick={this.handleClick}>New API Key</a>
        {this.state.keyForm} 
        <br /><br />
        <p>All responses from the OurHouse API will be in JSON format. There are several different tools that you can use to access data from our API.</p>
        <ul>
          <li>CURL</li>
          <li>GET request via your web browser</li>
          <li>Embedded GET requests in your source code. (Remember to secure your API key if you are embedding your get requests in your source code!)</li>
        </ul>
        <h3>Select one of the tutorials from below to help you get started.</h3>
        <h3>Querying for a certain type of house</h3>
        <p>Our database has a lot of information stored about each property added to the application. We want you to be able to get results from our database that are the most relevant to you. Below is a table containing the fields from our database that you can use to make a query. It’s very important that you match the case of the filter field or we won’t be able to process your query!</p>
          <table className="table">
            <thead>
              <tr>
                <th>Filter By Field</th>
                <th>Valid Filter Values</th>
                <th>Finds appartments that...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zipcode</td>
                <td>A 5 digit zip code</td>
                <td>Are located in a certain zipcode</td>
              </tr>
              <tr>
                <td>Rooms</td>
                <td>Valid integer</td>
                <td>Have a certain number of bedrooms</td>
              </tr>
              <tr>
                <td>ParkingSpots</td>
                <td>Valid integer</td>
                <td>Have a certain number of parking spots</td>
              </tr>
              <tr>
                <td>MonthlyRent</td>
                <td>Valid integer</td>
                <td>Have a certain monthly rent</td>
              </tr>
              <tr>
                <td>UtiltiiesIncluded</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Have/do not have utilities included</td>
              </tr>
              <tr>
                <td>Laundry</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Have/do not have laundry included</td>
              </tr>
              <tr>
                <td>Pets</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Pets are allowed/not allowed</td>
              </tr>
              <tr>
                <td>DistFromCC</td>
                <td>Valid double</td>
                <td>Are a certain distance from the CC</td>
              </tr>
              <tr>
                <td>DateAvailable</td>
                <td>A date in the format <code>2017-12-01</code></td>
                <td>Are available on a certain date</td>
              </tr>
              <tr>
                <td>LeaseTerm</td>
                <td>6, 12, 18, 24</td>
                <td>Have a certain lease length</td>
              </tr>
            </tbody>
          </table>
          <p>Other fields:</p>
        <table className="table">
          <thead>
              <tr>
                <th>Field</th>
                <th>Valid Values</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number of Responses</td>
                <td>Valid integer</td>
                <td>The number of houses returned</td>
              </tr>
            </tbody>
        </table>
        <p>Each query requires that you select a field to filter on, a value for that field, and the number of results you want to see at a time. Let's walk through an example. Let's say you want information for 10 houses in our database that have three bedrooms. Your URL would look like this:</p>
        <code>https://ourhouse-stage.herokuapp.com/houseData/&ltYour API Key goes here&gt/&ltFilter By Field&gt=&ltFilter Value&gt/&ltNumber of Responses&gt</code><br /><br />
        <p>And a curl command would looke like this:</p>
        <code>curl -i -X GET https://ourhouse-stage.herokuapp.com/houseData/&ltYour API Key goes here&gt/&ltFilter By Field&gt=&ltFilter Value&gt/&ltNumber of Responses&gt</code><br /><br />
        <p>An example URL would look like this:</p>
        <code>https://ourhouse-stage.herokuapp.com/houseData/ABCDEFG1234/Zipcode=02155/3</code>
        <br /><br />
        <p>And the response to that example request would look like this:</p>
        <code>{ '[{"City": "Medford", "ParkingSpots": 1, "MonthlyRent": 2900, "Longitude": -71.11761260000003, "Zipcode": "02155", "State": "MA", "UtilitiesIncluded": false, "Pets": false, "LandlordId": 2, "Latitude": 42.4166637, "DistFromCC": 0.779666967374512, "Laundry": true, "Address1": "23 Curtis St.", "Address2": "", "Rooms": 4, "Id": 4}, {"City": "Medford", "ParkingSpots": 1, "MonthlyRent": 2700, "Longitude": -71.12299109999998, "Zipcode": "02155", "State": "MA", "UtilitiesIncluded": true, "Pets": false, "LandlordId": 2, "Latitude": 42.4125732, "DistFromCC": 0.510050941380327, "Laundry": true, "Address1": "300 Boston Ave", "Address2": "Apt. 3", "Rooms": 3, "Id": 5}, {"City": "Medford", "ParkingSpots": 1, "MonthlyRent": 2700, "Longitude": -71.12299109999998, "Zipcode": "02155", "State": "MA", "UtilitiesIncluded": true, "Pets": true, "LandlordId": 2, "Latitude": 42.4125732, "DistFromCC": 0.510050941380327, "Laundry": true, "Address1": "300 Boston Ave", "Address2": "Apt 3", "Rooms": 3, "Id": 6}]' }</code>

        <h3>Querying for reviews related to a specific house</h3>
        <p>In order to access the reviews related to a particular house, you will need the unique ID associated with that property. This means that you’ll need to use query our API to access all the data about a property, and then use the ID to query for reviews. Below is an example of a correct query for reviews.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Valid Values</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>House Id</td>
              <td>Valid integer</td>
              <td>The id of a house of which you wish to retrieve the reviews</td>
            </tr>
            <tr>
              <td>Number of Responses</td>
              <td>Valid integer</td>
              <td>The number of houses returned</td>
            </tr>
          </tbody>
        </table>
        <p>Your URL would look like this:</p>
        <code>https://ourhouse-stage.herokuapp.com/reviewData/&ltYour API Key goes here&gt/HouseID=&ltHouse Id&gt/&ltNumber of Responses&gt</code><br /><br />
        <p>A curl command would look like this:</p>
        <code>curl -i -X GET https://ourhouse-stage.herokuapp.com/reviewData/&ltYour API Key goes here&gt/HouseID=&ltHouse Id&gt/&ltNumber of Responses&gt</code><br /><br />
        <p>An example URL would look like this:</p>
        <code>https://ourhouse-stage.herokuapp.com/reviewData/ABCDEFG1234/HouseID=3/3</code>
        <br /><br />
        <p>And the response to that example request would look like this:</p>
        <code>WAITING FOR NEW REVIEW TABLE</code>
        <h3>Getting statistics about the property in an area</h3>
        <p>We’ve also provided a route that allows you to make structured queries to learn statistics about the properties in a certain area.</p>
        <p>For example, you can query to get the number of houses/landlords in a certain area, the number of houses with certain features, etc.</p>
        <table className="table">
            <thead>
              <tr>
                <th>Filter By Field</th>
                <th>Valid Filter Values</th>
                <th>Finds appartments that...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zipcode</td>
                <td>A 5 digit zip code</td>
                <td>Are located in a certain zipcode</td>
              </tr>
              <tr>
                <td>Rooms</td>
                <td>Valid integer</td>
                <td>Have a certain number of bedrooms</td>
              </tr>
              <tr>
                <td>ParkingSpots</td>
                <td>Valid integer</td>
                <td>Have a certain number of parking spots</td>
              </tr>
              <tr>
                <td>MonthlyRent</td>
                <td>Valid integer</td>
                <td>Have a certain monthly rent</td>
              </tr>
              <tr>
                <td>UtiltiiesIncluded</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Have/do not have utilities included</td>
              </tr>
              <tr>
                <td>Laundry</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Have/do not have laundry included</td>
              </tr>
              <tr>
                <td>Pets</td>
                <td><code>true</code> or <code>false</code></td>
                <td>Pets are allowed/not allowed</td>
              </tr>
              <tr>
                <td>DistFromCC</td>
                <td>Valid double</td>
                <td>Are a certain distance from the CC</td>
              </tr>
              <tr>
                <td>DateAvailable</td>
                <td>A date in the format <code>2017-12-01</code></td>
                <td>Are available on a certain date</td>
              </tr>
              <tr>
                <td>LeaseTerm</td>
                <td>6, 12, 18, 24</td>
                <td>Have a certain lease length</td>
              </tr>
            </tbody>
          </table>
          <p>Other fields:</p>
          <table className="table">
            <thead>
                <tr>
                  <th>Field</th>
                  <th>Valid Values</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Type</td>
                  <td><code>Landlord</code> or <code>House</code></td>
                  <td>What type of data you want statistics on.<br /> For example, if you want the number of landlords per area, you would set this to <code>Landlord</code></td>
                </tr>
            </tbody>
          </table>
          <p>Your URL would look like this:</p>
          <code>https://ourhouse-stage.herokuapp.com/statistics/&ltYour API Key goes here&gt/&ltData Type&gt/&ltFilter By Field&gt=&ltFilter Value&gt</code><br /><br />
          <p>A curl command would look like this:</p>
          <code>curl -i -X GET https://ourhouse-stage.herokuapp.com/statistics/&ltYour API Key goes here&gt/&ltData Type&gt/&ltFilter By Field&gt=&ltFilter Value&gt</code><br /><br />
          <p>An example URL would look like this:</p>
          <code>https://ourhouse-stage.herokuapp.com/statistics/ABCDEFG1234/House/Zipcode=02155</code>
          <br /><br />
          <p>And the response to that example request would look like this:</p>
          <code>{ '[{"numberHouses": 5}]' }</code>
      </div>
    );
  }
});
React.render(<Developer />, document.getElementById('APIHome'))
