package mk.ukim.finki.wp.service.impl;

import java.util.List;

import mk.ukim.finki.wp.model.Seller;
import mk.ukim.finki.wp.model.TypeProduct;
import mk.ukim.finki.wp.repository.SellerRepository;
import mk.ukim.finki.wp.repository.TypeRepository;
import mk.ukim.finki.wp.service.CrudSellerService;
import mk.ukim.finki.wp.service.CrudTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudSellerServiceImpl extends
		SimpleBaseEntityCrudServiceImpl<Seller, SellerRepository> implements
		CrudSellerService {

	@Autowired
	private SellerRepository repository;

	@Override
	protected SellerRepository getRepository() {
		return repository;
	}


	

}
