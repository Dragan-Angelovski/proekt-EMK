package mk.ukim.finki.wp.repository;

import mk.ukim.finki.wp.model.User;

public interface UserRepository extends JpaSpecificationRepository<User> {

	User findByUsername(String username);
	
	User findById(Long id);

}
