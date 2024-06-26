package nashtech.khanhdu.backend.data.repositories;


import nashtech.khanhdu.backend.data.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String userName);

    List<User> findByEmail(String email);

    List<User> findByUsernameContainingIgnoreCase(String name);

    Optional<User> findOneByUsername(String username);
}
