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
      console.log("HERE");
      console.log(this.state.email);
      console.log(this.state.password);
      data = this.state;
      $.ajax({
        type: 'POST',
        url: '/',
        data: data,
        success: function(result) {
          if(result[0].status == 200){
            window.location.href = "/houses";
          }
          else if (result[0].status == 400){
            alert(result[0].message);
          }
        }
      })
      event.preventDefault();
    },
    render: function(){
      return(
        <div className="LoginForm">
          <h1>Welcome to Our House</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="loginForm">
                <input className="loginInput" type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange('email')} />
              </label>
            </div>
            <div className="form-group">
              <label className="loginForm">
                <input className="loginInput" type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange('password')} />
              </label>
            </div>
            <input className="btn btn-basic"type="submit" value="Submit" />
          </form>
          New User? <a className="newUserLink" href="/signup">Sign Up!</a>
        </div>
      );
    }
});
React.render(<LoginForm />, document.getElementById('Welcome-Header'));