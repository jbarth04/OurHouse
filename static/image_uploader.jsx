// http://www.hartzis.me/react-image-upload/
var ImageUploader = React.createClass({
	getInitialState : function(){
		return{
			file:'',
			imagePreviewUrl:'',
			houseId:this.props.houseID
		};
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	},
	handleImageChange: function(e) {
		e.preventDefault();
    	let reader = new FileReader();
    	let file = e.target.files[0];

    	reader.onloadend = () => {
	      	this.setState({
	        	file: file,
	        	imagePreviewUrl: reader.result
	      	});
    	}

    	reader.readAsDataURL(file)
  	},
  	handleSubmit: function(e){
    	data = {imagePreviewUrl: this.state.imagePreviewUrl, HouseId: this.state.houseId}
    	$.ajax({
    		type: 'POST',
    		method: 'POST',
    		url: '/upload_photo',
    		data: data,
    		success: function(result) {
    			if(result.status == 200){
    				alertMessage = result.message + " Thank you for uploading your apartment!"
    				alert(alertMessage);
    				// window.location="/houses"
    			}
    			else if (result.status == 400){
    				alert(result.message);
    			}
    		}
    	})
    	event.preventDefault();
  	},
	render : function(){
		let {imagePreviewUrl} = this.state;
    	let $imagePreview = null;
    	if (imagePreviewUrl) {
      		$imagePreview = (<img src={imagePreviewUrl} />);
    	}
        //TODO: only render upload image button once the imagePreviewUrl != ""
	    return (
		      <div>
		        <form onSubmit={this._handleSubmit} className="Form">
		          <input type="file" onChange={this.handleImageChange} />
		          <input type="submit" className="btn btn-red" value="Upload Image" onClick={this.handleSubmit} />
		        </form>
		        {$imagePreview}
		      </div>
	    );
	}
});
React.render(<ImageUploader houseID={HouseId}/>, document.getElementById('imgUpload'));