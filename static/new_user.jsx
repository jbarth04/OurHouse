// frankie = Student('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
var NewUserForm = React.createClass ({
    getInitialState: function(){
      return{
        FirstName:'',
        LastName:'',
        Email:'',
        Password:'',
        ConPassword:'',
        PhoneNum: '',
        UserType: 'Student',
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

      var passLength = 8; 

      if (this.state.Password != this.state.ConPassword) {
        alert("The passwords you entered don't match. Try again!")
      } else if (this.state.Password.length <  passLength) {
        alert("Your password must be at least 8 characters long. Please try again!")
      }

      $.ajax({
        type: 'POST',
        url: '/signup',
        headers: { 
            'Cache-Control':'max-age:500'
        },
        data: data,
        success: function(result) {
          if(result[0].status == 201){
            window.location.href = "/";
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
                First Name: <br />
                <input type="text" value={this.state.FirstName} onChange={this.handleChange('FirstName')} />
              </label>
            </div>
            <div className="form-group">
              <label className="loginForm">
                Last Name: <br />
                <input type="text" value={this.state.LastName} onChange={this.handleChange('LastName')} />
              </label>
            </div>
            <div className="form-group">
              <label className="loginForm">
                Email: <br />
                <input type="text" value={this.state.Email} onChange={this.handleChange('Email')} />
              </label>
            </div>
            <div className="form-group">
              <label className="loginForm">
                Phone Number: <br />
                <input type="text" value={this.state.PhoneNum} onChange={this.handleChange('PhoneNum')} />
              </label> 
            </div>
            <div className="form-group">
              <label className="loginForm">
                Select One: <br />
                <select id="UserType" value={this.state.Type} onChange={this.handleChange('UserType')}>
                  <option value="Student">Student</option>
                  <option value="Landlord">Landlord</option>
                </select>
              </label>
            <div className="form-group">
              <label className="loginForm">
                Password: <br />
                <input type="password" value={this.state.Password} onChange={this.handleChange('Password')} />
              </label>
            </div>
             <div className="form-group">
              <label className="loginForm">
                Confirm Password: <br />
                <input type="password" value={this.state.ConPassword} onChange={this.handleChange('ConPassword')} />
              </label>
            </div>
        
            </div>
            <input type="submit" value="Submit" className="btn btn-info"/>
          </form>
        </div>
      );
    }
});
React.render(<NewUserForm />, document.getElementById('Signup-Header'));