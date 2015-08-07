package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Test;
import mk.ukim.finki.wp.repository.TestRepository;
import mk.ukim.finki.wp.service.TestService;

import org.springframework.beans.factory.annotation.Autowired;

public class CrudTestServiceImpl extends BaseEntityCrudServiceImpl<Test, TestRepository> implements TestService {

	@Autowired
	private TestRepository repository;
	@Override
	protected TestRepository getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}
