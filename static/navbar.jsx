var NavBar = React.createClass({
		generateItems:function(navbar_list){
			var navbar = navbar_list.map((item) => <li id={item.text}  className="navbar-links"><NavBarLink url={item.url} text={item.text} /></li>);
			return navbar;
		},
        render: function() {
            left_navbar_links = this.generateItems(left_navbar_items);
            right_navbar_links = this.generateItems(right_navbar_items);
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img className="navbar-brand navbar-logo" src={"static/images/logo1.png"}></img>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                {left_navbar_links}
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {right_navbar_links}
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
    });
var NavBarLink = React.createClass({
	render:function(){
		return (<a href={this.props.url} className="navbar-link" id={this.props.text}>{this.props.text}</a>);
	}
});
React.render(<NavBar />, document.getElementById('navbar'));