// http://www.hartzis.me/react-image-upload/
var ImageUploader = React.createClass({
	getInitialState : function(){
		return{
			file:'',
			imagePreviewUrl:''
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
  		console.log("HERE SUBMITTING");
    	// data = this.state;
    	// console.log(data);
    	// console.log(this.state.imagePreviewUrl);
    	// tdata = this.state.imagePreviewUrl
    	data = {imageUrl: this.state.imagePreviewUrl};
    	console.log(data);
    	$.ajax({
    		type: 'POST',
    		url: '/testupload',
    		data: data,
    		success: function(result) {
    			console.log(result)
    			// if(result.status == 200){
    			// 	console.log(result);
    			// 	location.reload();
    			// }
    			// else if (result.status == 400){
    			// 	console.log(result.message);
    			// }
    		}
    	})
    	event.preventDefault();
  	},
  	// generateForm: function(){

  	// },
  	// generateEmptyForm : function(){
  	// 	return(
  	// 		<div></div>
  	// 	)
  	// },
	render : function(){
		let {imagePreviewUrl} = this.state;
    	let $imagePreview = null;
    	if (imagePreviewUrl) {
      		$imagePreview = (<img src={imagePreviewUrl} />);
    	}

	    return (
		      <div>
		        <form onSubmit={this._handleSubmit}>
		          <input type="file" onChange={this.handleImageChange} />
		          <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
		        </form>
		        {$imagePreview}
		      </div>
	    );
	}
});
React.render(<ImageUploader />, document.getElementById('imgUpload'));