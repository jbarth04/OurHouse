var LoginForm = React.createClass ({
    getInitialState: function(){
      return{
        email:'',
        password:''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    },
    handleChange: function(key){
      return function(event){
        var state = {};
        state[key] = event.target.value;
        this.setState(state);
      }.bind(this);
    },
    handleSubmit: function(event){
      console.log(this.state.email);
      console.log(this.state.password);
      event.preventDefault();
    },
    render: function(){
      return(
        <div className="LoginForm">
          <h1>Welcome to Our House</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="loginForm">
              Login: <br />
              <input type="text" value={this.state.email} onChange={this.handleChange('email')} />
            </label> <br />
            <label className="loginForm">
              Password: <br />
              <input type="password" value={this.state.password} onChange={this.handleChange('password')} />
            </label> <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
});
// React.render(<WelcomeHeader />, document.getElementById('Welcome-Header'));
React.render(<LoginForm />, document.getElementById('Welcome-Header'));