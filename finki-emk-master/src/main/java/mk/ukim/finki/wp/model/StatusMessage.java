package mk.ukim.finki.wp.model;


public class StatusMessage {
	private String success;
	private String message;
	
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void setSuccess(String success) {
		this.success = success;
	}
	
	public String getSuccess(){
		return success;
	}
}
