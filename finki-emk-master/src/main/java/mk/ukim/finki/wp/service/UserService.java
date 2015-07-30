package mk.ukim.finki.wp.service;

import mk.ukim.finki.wp.model.User;

public interface UserService extends BaseEntityCrudService<User> {

  User findByUsername(String username);
  
  User findById(Long id);
}
