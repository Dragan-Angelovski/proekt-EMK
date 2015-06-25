package mk.ukim.finki.wp.model;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Entity;

import org.hibernate.search.annotations.Analyze;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Store;

@Entity
@Table(name = "types")
public class TypeProduct extends BaseEntity {
	@Column(unique = true, nullable = false)
	@Field(index = Index.YES, analyze = Analyze.YES, store = Store.NO)
	private String name;
	
	@ManyToOne
	private Category category;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}
