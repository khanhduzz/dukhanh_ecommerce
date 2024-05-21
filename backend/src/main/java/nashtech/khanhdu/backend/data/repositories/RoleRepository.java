package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
}
