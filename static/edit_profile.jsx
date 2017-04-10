var EditUserForm = React.createClass ({
    getInitialState: function(){
      return{
        FirstName:user.FirstName,
        LastName:user.LastName,
        Email:user.Email,
        PhoneNum: user.Phone,
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
        type: 'PUT',
        url: '/profile_edit',
        data: data,
        headers: {
            'Cache-Control': 'max-age=1000' 
        },
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
        <div className="EditProfileForm Form">
          <h2>Edit Profile</h2>
          <p>Email: {this.state.Email}</p>
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
                Phone Number: <br />
                <input type="text" value={this.state.PhoneNum} onChange={this.handleChange('PhoneNum')} />
              </label> 
            </div>
            <input type="submit" value="Update" className="btn btn-red"/>
          </form>
        </div>
      );
    }
});
React.render(<EditUserForm />, document.getElementById('EditUserForm'));