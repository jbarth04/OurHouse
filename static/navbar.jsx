var NavBar = React.createClass({
		generateItems:function(){
			var navbar = navbar_items.map((item) => <li id={item.text}  className="navbar-links"><NavBarLink url={item.url} text={item.text} /></li>);
			return navbar;
		},
		// generateLink:function(){
		// 	return (<a href={this.props.url} className="navbar-link" id={this.props.text}>{this.props.text}</a>);
		// },
        render: function() {
            navbar_links = this.generateItems();
            return(
            	<ul>
            	{navbar_links}
            	</ul>
            );
        }
    });
var NavBarLink = React.createClass({
	render:function(){
		return (<a href={this.props.url} className="navbar-link" id={this.props.text}>{this.props.text}</a>);
	}
});
React.render(<NavBar />, document.getElementById('navbar'));