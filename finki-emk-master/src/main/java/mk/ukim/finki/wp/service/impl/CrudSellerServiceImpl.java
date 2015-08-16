package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Seller;
import mk.ukim.finki.wp.repository.SellerRepository;
import mk.ukim.finki.wp.service.CrudSellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudSellerServiceImpl extends 
SimpleBaseEntityCrudServiceImpl<Seller, SellerRepository> implements 
CrudSellerService{


	@Autowired
	private SellerRepository repository;
	@Override
	protected SellerRepository getRepository() {
		return repository;
	}

	@Override
	public Seller findByUserId(Long id) {
		// TODO Auto-generated method stub
		return repository.findByUserId(id);
	}


	

}
