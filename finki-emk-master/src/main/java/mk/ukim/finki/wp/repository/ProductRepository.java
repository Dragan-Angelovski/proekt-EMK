package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.model.Product;
import mk.ukim.finki.wp.model.TypeProduct;


public interface ProductRepository extends JpaSpecificationRepository<Product> {

	List<Product> findByNameLikeOrderByIdDesc(String name);
	
	List<Product> findByCategoryId(Long id);
	
	List<Product> findByCategory(Category category);
	
	List<Product> findByTypeId(Long id);
	
}
