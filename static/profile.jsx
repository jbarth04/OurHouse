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
				{profile}
			</ul>
		);
	}
});

var Properties = React.createClass({
	generatePropList: function(Address1, Address2, Status){
		return (<tr>
			<th>{Address1} {Address2}</th>
			<th>{Status}</th>
			</tr>);
	},
	render: function(){
		properties = [];
		{props.map((house) => properties.push(this.generatePropList(house.Address1, house.Address2, "Feature Coming Soon")))};
		return(<table>
			<tr>
				<th>Address</th>
				<th>Status</th>
			</tr>
			{properties}
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
