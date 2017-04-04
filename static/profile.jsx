var Profile = React.createClass({
	generateInfo: function(){
		info = [];
		info.push(<li>Name: {this.props.FName} {this.props.LName}</li>);
		info.push(<li>Email: {this.props.Email}</li>);
		info.push(<li>Phone Number: {this.props.Phone}</li>);
		return info;
	},
	render: function(){
		profile = this.generateInfo();
		return(
			
			<ul className="Info, NoBulletsList">
			<p className="newPropLabel">Personal Information</p>
				{profile}
			</ul>
		);
	}
});

var Properties = React.createClass({
	generatePropList: function(houseId, Address1, Address2, Status){
		return (<tr>
			<th>
				{Address1} 
				{Address2}
				<a href = {"/house_profile_edit="+houseId} className="btn btn-xs btn-default edit-btn">Edit</a>
			</th>
			<th>{Status}</th>
			</tr>);
	},
	render: function(){
		properties = [];
		{props.map((house) => properties.push(this.generatePropList(house.Id, house.Address1, house.Address2, "Feature Coming Soon")))};
		return(
			<table className="table propertiesTable">
				<p className="newPropLabel">Properties</p>
				<thead className="tableCenter">
					<tr className="tableCenter">
						<th className="tableCenter">Address</th>
						<th className="tableCenter">Status</th>
					</tr>
				</thead>
				<tbody className="tableCenter">
					{properties}
				</tbody>
			</table>
		);
	}
});

React.render(<Profile 
	FName={user.FirstName} LName={user.LastName} Email={user.Email}
	Phone={user.Phone} />, 
	document.getElementById('profile'));
if(user["Type"] == "Landlord"){
	React.render(<Properties props/>, document.getElementById('properties'));
}
