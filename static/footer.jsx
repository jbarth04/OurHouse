var NavBar = React.createClass({
		generateItems:function(navbar_list){
			var navbar = navbar_list.map(function(item) { 
                if (item.dropdown != null){
                    return <NavBarDropdown item={item}/>
                }
                else {
                    return <li id={item.text}  className="navbar-links"><NavBarLink url={item.url} text={item.text} /></li>
                }
            });
			return navbar;
		},
        render: function() {
            left_navbar_links = this.generateItems(left_navbar_items);
            right_navbar_links = this.generateItems(right_navbar_items);
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#OHnavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>                        
                            </button>
                            <img className="navbar-brand navbar-logo OurHouseLogo" src="static/images/logo1.png" alt="logo for OurHouse"></img>
                        </div>
                        <div id="OHnavbar" className="collapse navbar-collapse">
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
var NavBarDropdown = React.createClass({
    generateDropdowns:function(dropdownArr){
        links = [];
        for(var i = 0; i < dropdownArr.length; i++){
            links.push(<li><a href={dropdownArr[i].url}>{dropdownArr[i].text}</a></li>);
        }
        return links;
    },
    render:function(){
        item = this.props.item
        dropdownLinks = item.dropdown;
        dropdownMenu = this.generateDropdowns(dropdownLinks);
        return(
            <li className="dropdown navbar-links" id={item.text}>
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">{item.text}
                    <span className="caret"></span>
                </a>
                    <ul className="dropdown-menu">
                    {dropdownMenu}
                    </ul>
            </li>
        );
    }
});
React.render(<NavBar />, document.getElementById('navbar'));