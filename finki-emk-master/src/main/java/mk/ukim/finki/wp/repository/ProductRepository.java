package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.Book;
import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.model.Product;


public interface ProductRepository extends JpaSpecificationRepository<Product> {

	List<Product> findByNameLikeOrderByIdDesc(String name);
	
	List<Product> findByCategoryId(Long id);
	
	List<Product> findByCategory(Category category);
	
	List<Product> findBySellerId(Long id);
	
	// Proba
	// Listanje na proizvodi spored daden tip
	List<Product> findByTypeId(Long id);
	
	//Listanje spored tezga
	List<Product> findByStallId(Long id);

	
	
	
}
