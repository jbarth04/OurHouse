var LoginForm = React.createClass ({
    getInitialState: function(){
      return{
        email:'',
        password:'',
        FirstName:'',
        LastName:'',
        NewEmail:'',
        Password:'',
        ConPassword:'',
        PhoneNum: '',
        UserType: 'Student',
        NewUser: false 

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

    handleSubmitExisting: function(event){
        console.log("Submitting old user")
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

    handleSubmitNew: function(event){

      data = this.state;
      var passLength = 5; 

      if (this.state.Password != this.state.ConPassword) {
        alert("The passwords you entered don't match. Try again!")
      } else if (this.state.Password.length <  passLength) {
        alert("Your password must be at least 8 characters long. Please try again!")
      }

      console.log(data)

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

    handleNewUser: function(event) { 
      this.state.NewUser = true;
      this.setState({NewUser: true});
    },

    render: function(){  
      if (this.state.NewUser == false) { 
        return(
          <div className="LoginForm">
            <h1>Welcome to Our House</h1>
            <form onSubmit={this.handleSubmitExisting}>
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
            <button className="btn btn-basic" onClick ={this.handleNewUser}> New User? Sign up here! </button>
          </div>
          
        );
      } else if (this.state.NewUser == true) {
        return(
        <div className="LoginForm"> 
          <h2> Welcome to OurHouse! <br/> We are glad to have you! </h2>
          <form onSubmit={this.handleSubmitNew}>
            <div className="form-group">
                <input value={this.state.FirstName} placeholder= "First Name" onChange={this.handleChange('FirstName')} />
            </div>
            <div className="form-group">
                <input value={this.state.LastName} placeholder="Last Name"onChange={this.handleChange('LastName')} />
            </div>
            <div className="form-group">
                <input value={this.state.NewEmail} placeholder="Email Address" onChange={this.handleChange('NewEmail')} />
            </div>
            <div className="form-group">
                <input value={this.state.PhoneNum} placeholder="Phone Number" onChange={this.handleChange('PhoneNum')} />
            </div>
            <div className="form-group">
                <label> 
                Select User Type <br/>
                <select id="UserType" value={this.state.Type} placeholder ="Select User Type" onChange={this.handleChange('UserType')}>
                  <option value="Student">Student</option>
                  <option value="Landlord">Landlord</option>
                </select>
                </label>
            <div className="form-group">
                <input type="password" value={this.state.Password} placeholder= "Password" onChange={this.handleChange('Password')} />
            </div>
             <div className="form-group">
                <input type="password" value={this.state.ConPassword} placeholder= "Confirm Password" onChange={this.handleChange('ConPassword')} />
            </div>
        
            </div>
            <input type="submit" value="Submit" className="btn btn-info"/>
          </form>
        </div>
        )
      }
    }
});

React.render(<LoginForm />, document.getElementById('Welcome-Header'));
