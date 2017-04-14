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
	generateLandlordInfo: function(){
		landlordInfo = [];
		landlordInfo.push(<p>{this.props.LandlordEmail}</p>);
		landlordInfo.push(<p>{this.props.LandlordPhone}</p>);
		return (
			<div className="landlordInfoBox">
				{landlordInfo}
			</div>
		);
	},
	render: function(){
		profile = this.generateInfo();
		landlordInfo = this.generateLandlordInfo();
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
					{landlordInfo}
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
React.render(<HouseProfile 
	LandlordFName={landlord.FirstName} LandlordLName={landlord.LastName} 
	LandlordEmail={landlord.Email} LandlordPhone={landlord.Phone} 
	Address1={house.Address1} Address2={house.Address2} City={house.City} State={house.State}
	Dist={house.DistFromCC} Rooms={house.Rooms}
	Rent={house.MonthlyRent} Parking={house.ParkingSpots} 
	Utilities={house.UtilitiesIncluded} Laundry={house.Laundry} Pets={house.Pets}
	DateAvailable={house.DateAvailable} LeaseTerm={house.LeaseTerm} Photos={photos}/>, 
	document.getElementById('HouseInfo'));

React.render(<HouseReviews Reviews={reviews} />, document.getElementById('HouseReviews'));
React.render(<ReviewForm HouseId={house.Id}/>, document.getElementById('ReviewForm'));
