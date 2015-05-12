package mk.ukim.finki.wp.service;

import java.util.List;

import mk.ukim.finki.wp.model.TypeProduct;

public interface CrudTypeService extends BaseEntityCrudService<TypeProduct> {

	public List<TypeProduct> findByCategoryId(Long id);

}

