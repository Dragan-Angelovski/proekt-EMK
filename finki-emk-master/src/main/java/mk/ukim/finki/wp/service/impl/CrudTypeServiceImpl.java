package mk.ukim.finki.wp.service.impl;

import java.util.List;

import mk.ukim.finki.wp.model.TypeProduct;
import mk.ukim.finki.wp.repository.TypeRepository;
import mk.ukim.finki.wp.service.CrudTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudTypeServiceImpl extends
		SimpleBaseEntityCrudServiceImpl<TypeProduct, TypeRepository> implements
		CrudTypeService {

	@Autowired
	private TypeRepository repository;

	@Override
	protected TypeRepository getRepository() {
		return repository;
	}


	@Override
	public List<TypeProduct> findByCategoryId(Long id) {
		return repository.findByCategoryId(id);
	}

}
