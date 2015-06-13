package mk.ukim.finki.wp.service.impl;

import java.util.List;

import mk.ukim.finki.wp.model.Stall;
import mk.ukim.finki.wp.model.TypeProduct;
import mk.ukim.finki.wp.repository.StallRepository;
import mk.ukim.finki.wp.service.CrudStallService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudStallServiceImpl extends
		SimpleBaseEntityCrudServiceImpl<Stall, StallRepository> implements
		CrudStallService {

	@Autowired
	private StallRepository repository;

	@Override
	protected StallRepository getRepository() {
		return repository;
	}

	@Override
	public List<Stall> findBySellerId(Long id) {
		// TODO Auto-generated method stub
		return repository.findBySellerId(id);
	}
	
	



}
