// frankie = Student('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
var NewUserForm = React.createClass ({
    getInitialState: function(){
      return{
        FirstName:'',
        LastName:'',
        Email:'',
        PhoneNum: 0000000000,
        UserType: 'Student',
        //We will need a way to deal with passwords
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

      data = this.state;
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: data,
        success: function(result) {
          console.log(result);
        }
      })
      event.preventDefault();
    },

    render: function(){
      return(
        <div className="LoginForm">
          <h1>Welcome to Our House</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="loginForm">
              First Name: <br />
              <input type="text" value={this.state.FirstName} onChange={this.handleChange('FirstName')} />
            </label> <br />
            <label className="loginForm">
              Last Name: <br />
              <input type="text" value={this.state.LastName} onChange={this.handleChange('LastName')} />
            </label> <br />
            <label className="loginForm">
              Email: <br />
              <input type="text" value={this.state.Email} onChange={this.handleChange('Email')} />
            </label> <br />
            <label className="loginForm">
              Phone Number: <br />
              <input type="text" value={this.state.PhoneNum} onChange={this.handleChange('PhoneNum')} />
            </label> <br />
            <label className="loginForm">
              Select One: <br />
              <select id="UserType" value={this.state.Type} onChange={this.handleChange('UserType')}>
                <option value="Student">Student</option>
                <option value="Landlord">Landlord</option>
              </select>
            </label><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
});
// React.render(<WelcomeHeader />, document.getElementById('Welcome-Header'));
React.render(<NewUserForm />, document.getElementById('Signup-Header'));