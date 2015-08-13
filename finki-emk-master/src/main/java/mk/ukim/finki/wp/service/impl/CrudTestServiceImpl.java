package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Test;
import mk.ukim.finki.wp.repository.TestRepository;
import mk.ukim.finki.wp.service.TestService;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class CrudTestServiceImpl extends BaseEntityCrudServiceImpl<Test, TestRepository>implements TestService {

	
	@Autowired
	private SessionFactory sessionFactory;
	
	public CrudTestServiceImpl(){
		
	}
	
	public CrudTestServiceImpl(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}
	
	@Transactional
	public Test save(Test uplaodFile){
		sessionFactory.getCurrentSession().save(uplaodFile);
		return uplaodFile;
	}

	@Override
	protected TestRepository getRepository() {
		// TODO Auto-generated method stub
		return null;
	}

}
