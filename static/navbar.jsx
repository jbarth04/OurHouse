var NavBar = React.createClass({
        render: function() {
            return (<button type="submit"> <a href="{{ url_for('newhome') }}">Add Home</a></button>
);
        }
    });
React.render(<NavBar />, document.getElementById('navbar'));