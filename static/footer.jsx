var Footer = React.createClass({
        render: function() {
            return(
                <div className="container footertext">
                    <p className="text-muted">For all things <strong>developer</strong> related, click <a href="/developer">here</a></p>
                </div>
            );
        }
    });
React.render(<Footer />, document.getElementById('footerbar'));