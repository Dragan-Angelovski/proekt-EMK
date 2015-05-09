package mk.ukim.finki.wp.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {

	@NotEmpty	
	private String name;

	private double price;
	
	private double quantity;

	@Column(length = 1000)
	private String description;
	
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private TypeProduct type;

	//@ManyToMany(mappedBy = "books")
	//private List<Order> orders;

	@ManyToOne
	private Stall stall;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public TypeProduct getType() {
		return type;
	}

	public void setType(TypeProduct type) {
		this.type = type;
	}
	
	
}
