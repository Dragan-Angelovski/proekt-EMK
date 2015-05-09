package mk.ukim.finki.wp.model;

import org.hibernate.search.annotations.*;

import javax.persistence.Table;

import javax.persistence.Entity;

@Entity
@Table(name = "categories")
@Indexed
public class Category extends BaseEntity {

    @Field(index = Index.YES, analyze = Analyze.YES, store = Store.NO)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
