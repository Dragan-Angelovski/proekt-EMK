package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.repository.CategoryRepository;
import mk.ukim.finki.wp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends
        BaseEntityCrudServiceImpl<Category, CategoryRepository> implements
        CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Override
    protected CategoryRepository getRepository() {
        return repository;
    }

}
