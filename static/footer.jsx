var Footer = React.createClass({
        render: function() {
            return(
                <div className="container">
                    <p className="text-muted">For all things developer related, click <a href="/developer">here</a></p>
                </div>
            );
        }
    });
React.render(<Footer />, document.getElementById('footerbar'));