var NavBar = React.createClass({
		generateItems:function(){
			var navbar = navbar_items.map((item) => <li id={item.text}  className="navbar-links"><NavBarLink url={item.url} text={item.text} /></li>);
			return navbar;
		},
        render: function() {

            navbar_links = this.generateItems();
            return(
                // {% extends "bootstrap/base.html" %}
            	// {% block navbar %}
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <img className="navbar-brand navbar-logo" src={"static/images/logo1.png"}></img>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav">
                                {navbar_links}
                            </ul>
                        </div>
                    </div>
                </nav>
                // {% endblock %}
            );
        }
    });
var NavBarLink = React.createClass({
	render:function(){
		return (<a href={this.props.url} className="navbar-link" id={this.props.text}>{this.props.text}</a>);
	}
});
React.render(<NavBar />, document.getElementById('navbar'));