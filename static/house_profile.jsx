// HouseInfo

var HouseProfile = React.createClass({
	generatePhotos: function(){
		photos = this.props.Photos.map((photo) => <li className="inlineBlock"><img src={photo}></img></li>);
		return(
			<ul className="NoBulletsList">
				{photos}
			</ul>
		);
	},
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
		if(this.props.Photos.length > 0){
			photos = <PhotoCarousel Photos={this.props.Photos} />
		}else {
			photos = <div></div>
		}
		return(
			<div className="HousePhotos container">
				{photos}
				<ul className="HouseInfoList, NoBulletsList">
					{profile}
				</ul>
			</div>
		);
	}
});

// Code from:
// https://raw.githubusercontent.com/hkrdrm/reactCarousel/master/carousel.jsx
var PhotoCarousel = React.createClass({
	render : function(){
		slides = this.props.Photos.map(function(photo, index){
			return <Slide imgSrc={photo} index={index} />;
		});
		return(
			<div id="myCarousel" className="carousel slide" data-ride="">
        		<div className="carousel-inner" role="listbox">
        		  { [] }
        		  { slides }
        		</div>
        		<a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        		  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        		</a>
        		<a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        		  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        		</a>
      		</div>
		);
	}
});

var Slide = React.createClass({
	render: function(){
		let className = this.props.index == 0? 'item active' : 'item';
	    return(
	    	<div className={ className }>
	    		<img src={ this.props.imgSrc } alt="..." width="100%"/>
	    	</div>
	    );
	}
});

var HouseReviews = React.createClass({
	generateReview : function(review){
		UpdatedArr = review.UpdatedAt.split(" ");
		date = UpdatedArr[0];
		return(
			<div className="reviewText">
				<p>{review.Stars} Stars</p>
				<p>{review.Comment}</p>
				<p>{date}</p>
				<hr />
			</div>
		);
	},
	render : function(){
		var reviewList = [];
		reviewList = this.props.Reviews.map((review) => this.generateReview(review));
		return(
			<div className="reviewList">
				{reviewList}
			</div>
		);
	}
});

var ReviewForm = React.createClass({
	getInitialState : function(){
		return{
			Comment:'',
			House:this.props.HouseId,
			Stars:'5'
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
  	handleSubmit: function(event){
    	data = this.state;
    	$.ajax({
    		type: 'POST',
    		url: '/reviews',
    		data: data,
    		success: function(result) {
    			if(result.status == 200){
    				location.reload();
    			}
    			else if (result.status == 400){
    				alert(result.message);
    			}
    		}
    	})
    	event.preventDefault();
  	},
  	generateForm: function(){
  		return(
			<div className="Form">
	        	<form onSubmit={this.handleSubmit}>
	        		<div className="form-group">
	        			<label className="reviewForm">
	        				Write your own review for this house!: <br />
	        				<textarea className="reviewTextBox" type="text" maxLength="4096" value={this.state.Comment} onChange={this.handleChange('Comment')} />
	        			</label>
	        		</div>
					<div className="form-group">
					<label> 
						Stars 
        					<select className="" value={this.state.Stars} onChange={this.handleChange('Stars')}>
        					<option value="5">5</option>
        					<option value="4">4</option>
        					<option value="3">3</option>
        					<option value="2">2</option>
        					<option value="1">1</option>
        					</select>
					</label>
      				</div>
	        		<input type="submit" value="Submit" className="btn btn-red"/>
	        	</form>
	        </div>
	    );
  	},
  	generateEmptyForm : function(){
  		return(
  			<div></div>
  		)
  	},
	render : function(){
		if (usertype.type == "Student"){
			show = this.generateForm();
		} else{
			show = this.generateEmptyForm();
		}
		return (show);
	}
});

var ContactForm = React.createClass ({
  getInitialState: function() {
    return {
    	message:'Enter your email here.',
    	useremail:'',
    	landlordemail: this.props.LandlordEmail,
      landlordfname: this.props.LandlordFName
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
            alert(result);
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

  generateEmptyForm : function(){
  	return(
  			<div></div>
  	)
  },

  generateForm: function() {
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
        			<textarea className="reviewTextBox" type="textarea" maxlength="4098"value={this.state.message} onChange={this.handleChange('message')} /><br/>
        			</label>
      			</div> 
    		<input className="btn btn-primary"type="submit" value="Contact this landlord!"/>  
   		</form>
  	)
  },

  render: function() {
    if (usertype.type == "Student"){
		show = this.generateForm();
	} else{
		show = this.generateEmptyForm();
	}
	return (show);
  }
});

var ZillowData = React.createClass ({ 
	generateData: function(){
		headers = {"homeDescription":"Home Description", "parkingType":"Parking Type", 
				   "finishedSqFt": "Square Feet", "numFloors":"Number of Floors", 
				   "rooms":"Types of Rooms", "appliances":"Appliances", "heatingSystem":"Heating System",
				   "heatingSource":"Heating Source", "yearBuilt":"Year Built", "yearUpated":"Year Updated"};
		ZillowData = this.props.Data;
		Data = Object.keys(ZillowData).map(function(d){ 
			return (<p><h4>{headers[d]}:</h4> {ZillowData[d]}</p>);}); 
		return Data;
	},
	render: function() { 
		Data = this.generateData(); 
		return(
			<div className="zillowInfo">
				<h3>Information brought to you by Zillow:</h3>
				{Data}
				<br />
				<a href="https://www.zillow.com/">
					<img src="static/images/zillow-Logo.png" id="zillowLogo"></img> 
				</a>
			</div>
		);
	}
});

React.render(<HouseProfile LandlordLName={landlord.LastName} LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} City={house.City} State={house.State}
	Dist={house.DistFromCC} Rooms={house.Rooms}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets}
	DateAvailable={house.DateAvailable} LeaseTerm={house.LeaseTerm} Photos={photos}/>, 
	document.getElementById('HouseInfo'));

React.render(<HouseReviews Reviews={reviews} />, document.getElementById('HouseReviews'));
React.render(<ReviewForm HouseId={house.Id}/>, document.getElementById('ReviewForm'));

<<<<<<< HEAD
React.render(<ContactForm usertype={usertype} LandlordEmail={landlord.Email} LandlordFName={landlord.FirstName}/>, document.getElementById('ContactForm'));
=======
React.render(<ContactForm LandlordEmail={landlord.Email} LandlordFName={landlord.FirstName}/>, document.getElementById('ContactForm'));
if (zillow.ZillowData != null){
	React.render(<ZillowData Data={zillow.ZillowData} />, document.getElementById('ZillowData')); 
}
>>>>>>> 815ae0672a6ad12af2ce81577e087eda2a34101f

