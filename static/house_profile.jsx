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
		return(
			<div className="reviewText">
				<p>{review.Comment} {review.Stars} </p>
				<p>{review.UpdatedAt}</p>
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
        <textarea className="reviewTextBox" type="textarea" maxlength="4098"value={this.state.message} onChange={this.handleChange('message')} /><br/>
        </label>
      </div> 
    <input className="btn btn-primary"type="submit" value="Contact this landlord!"/>  
    </form>
    );
  }
});

// var ZillowData = React.createClass ({ 

//   generateInfo: function(){

//     console.log(props);
//     zwsid = X1-ZWz1992ngtq497_7oq0o; 
//     address1 = this.props.Address1;

//     for (i = 0; i < address1.length; i++) {
//       if (address1[i] == 0) {
//         address1 = address1.substr(i-1, i) + '+' + address1(i + 1);
//       }
//     }
//     this.props.Address1 = address1;
//     address2 = this.props.Address2; 
//     zip = this.props.Zipcode; 
//     // requestURL = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=' + zwsid + '&address=' address1 + '&citystatezip=' + zipcode;

//     // $.ajax ({
//     //   type: 'GET',
//     //   url: requestURL,
//     //   dataType: 'xml',


//     // })

//     // info = [];



//   },

//   render: function() { 
//     return(
//       <h1> {this.props.Address1} </h1>     
//     );
//   }
// });

React.render(<HouseProfile LandlordLName={landlord.LastName} LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} City={house.City} State={house.State}
	Dist={house.DistFromCC} Rooms={house.Rooms}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets}
	DateAvailable={house.DateAvailable} LeaseTerm={house.LeaseTerm} Photos={photos}/>, 
	document.getElementById('HouseInfo'));

React.render(<HouseReviews Reviews={reviews} />, document.getElementById('HouseReviews'));
React.render(<ReviewForm HouseId={house.Id}/>, document.getElementById('ReviewForm'));

React.render(<ContactForm LandlordEmail={landlord.Email} LandlordFName={landlord.FirstName}/>, document.getElementById('ContactForm'));

// React.render(<ZillowData Address1={house.Address1} Address2={house.Address2} Zipcode={house.Zipcode}/>, document.getElementById('ZillowData')); 
