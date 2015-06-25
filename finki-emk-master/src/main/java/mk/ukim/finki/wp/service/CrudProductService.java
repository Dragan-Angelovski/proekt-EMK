package mk.ukim.finki.wp.service;


import java.util.List;

import mk.ukim.finki.wp.model.Product;

public interface CrudProductService extends BaseEntityCrudService<Product> {

	public List<Product> findByCategoryId(Long id);

	// Listanje spored daden typeId
	public List<Product> findByTypeId(Long id);
	
	//Listanje spored daden stallId
	public List<Product> findByStallId(Long id);

	//Listanje spored seller id
	List<Product> findBySellerId(Long id);
	//Search 
	public List search(String text);

}
