package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.Book;
import mk.ukim.finki.wp.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaSpecificationRepository<Book> {

    List<Book> findByCategoryId(Long id);

    List<Book> findByCategory(Category category);

    List<Book> findByNameLikeOrderByIdDesc(String name);

    List<Book> findByPromoted(boolean b);
}
