var KeyForm = React.createClass ({
  
  getInitialState: function() {
    return {
      ProjectName:'',
      Email:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  },

  handleChange: function(key) {
    return function (event) {
      var state ={};
      state[key] = event.target.value;
      this.setState(state);
      }.bind(this);
  },

  handleSubmit: function(event){
      data = this.state;
      $.ajax({
        type: 'POST',
        url: '/generateAPIkey',
        data: data,
        success: function(result) {
          if(result[0].status == 201){
            alert(result[0].key)
          }
          else if (result[0].status == 400){
            alert(result[0].message);
          }
        }
      })
      event.preventDefault();
  },

  render: function() {
    return (
    <form onSubmit={this.handleSubmit} className="newPropForm">
    	<p className="newPropLabel">Get API Key</p>
      	<div className="newPropFormLabel form-group">
	        <label>
	        	Project Title:
		        <input className="new-prop" type="text" value={this.state.ProjectName} onChange={this.handleChange('ProjectName')} /><br/>
	        </label>
      	</div>
      	<div className="newPropFormLabel form-group">
	        <label>
	          Email
	        <input className="new-prop" type="text" value={this.state.Email} onChange={this.handleChange('Email')} /><br/>
	        </label>
      	</div>
    	<input className="btn btn-primary"type="submit" value="Generate"/>  
    </form>
    );
  }
});


React.render(
  <KeyForm />,
  document.getElementById('keyForm')
);

