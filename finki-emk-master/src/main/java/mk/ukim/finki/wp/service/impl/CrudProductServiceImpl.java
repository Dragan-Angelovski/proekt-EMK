package mk.ukim.finki.wp.service.impl;

import java.util.List;

import mk.ukim.finki.wp.model.Product;
import mk.ukim.finki.wp.repository.ProductRepository;
import mk.ukim.finki.wp.service.CrudProductService;

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

	//Lista od prizvodi od dade type
	@Override
	public List<Product> findByTypeId(Long id) {
		// TODO Auto-generated method stub
		return repository.findByTypeId(id);
	}

}
