package nashtech.khanhdu.backend.data.repositories;


import nashtech.khanhdu.backend.data.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUserName(String userName);

    List<User> findByEmail(String email);

    List<User> findByUserNameContainingIgnoreCase(String name);

}
