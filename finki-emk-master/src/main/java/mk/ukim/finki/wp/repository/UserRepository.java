package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.User;

public interface UserRepository extends JpaSpecificationRepository<User> {

	User findByUsername(String username);
	
	User findById(Long id);

}
