package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Stall;
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



}
