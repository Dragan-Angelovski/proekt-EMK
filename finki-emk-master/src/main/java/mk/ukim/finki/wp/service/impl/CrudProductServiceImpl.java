package mk.ukim.finki.wp.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import mk.ukim.finki.wp.model.Book;
import mk.ukim.finki.wp.model.Product;
import mk.ukim.finki.wp.repository.ProductRepository;
import mk.ukim.finki.wp.service.CrudProductService;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudProductServiceImpl extends
BaseEntityCrudServiceImpl<Product, ProductRepository> implements
		CrudProductService {

	@Autowired
	private ProductRepository repository;

	@Override
	protected ProductRepository getRepository() {
		return repository;
	}

	@Override
	public List<Product> findByCategoryId(Long id) {
		return repository.findByCategoryId(id);
	}

	// Lista od prizvodi od dade type
	@Override
	public List<Product> findByTypeId(Long id) {
		// TODO Auto-generated method stub
		return repository.findByTypeId(id);
	}

	//Lista od proizvodi spored tezga
	@Override
	public List<Product> findByStallId(Long id) {
		// TODO Auto-generated method stub
		return repository.findByStallId(id);
	}

	//Lista od proizvodi spored seller 
	@Override
	public List<Product> findBySellerId(Long id) {
		// TODO Auto-generated method stub
		return repository.findBySellerId(id);
	}
	//Search 
	 @PersistenceContext
	 private EntityManager em;
	 
	public List search(String text) {
		
		System.out.println("SEarch: "+text);
	    FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);

	    QueryBuilder qb = fullTextEntityManager.getSearchFactory()
	            .buildQueryBuilder().forEntity(Product.class).get();

	    org.apache.lucene.search.Query luceneQuery = qb.keyword()
	            .onFields("name", "description", "category.name")
	            .matching(text)
	            .createQuery();

	    // wrap Lucene query in a javax.persistence.Query
	    javax.persistence.Query jpaQuery =
	            fullTextEntityManager.createFullTextQuery(luceneQuery, Product.class);

	    // execute search
	    return jpaQuery.getResultList();
	  }


}
