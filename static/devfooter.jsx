var DevFooter = React.createClass({
        render: function() {
            return(
                <div className="container footertext">
                    <p className="text-muted"><a href="https://github.com/tuftsdev/comp120-s2017-team2">Github</a> and <a href="https://webengineering2017.wordpress.com/">Engineering Notebook</a></p>
                </div>
            );
        }
    });
React.render(<DevFooter />, document.getElementById('devfooter'));