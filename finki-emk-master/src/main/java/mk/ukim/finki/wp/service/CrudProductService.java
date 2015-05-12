package mk.ukim.finki.wp.service;


import java.util.List;

import mk.ukim.finki.wp.model.Product;

public interface CrudProductService extends BaseEntityCrudService<Product> {

	public List<Product> findByCategoryId(Long id);
	//Listanje spored daden typeId
		public List<Product> findByTypeId(Long id);
}
