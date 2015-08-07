package mk.ukim.finki.wp.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "test_upload")
public class Test extends BaseEntity{

	private String fileName;
	
	private byte[] image;
	
	public String getFileName() {
		return fileName;
	}
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public void setImage(byte[] image) {
		this.image = image;
	}
	
	public byte[] getImage() {
		return image;
	}
}
