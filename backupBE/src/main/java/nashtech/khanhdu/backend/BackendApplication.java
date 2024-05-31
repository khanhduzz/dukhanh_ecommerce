package nashtech.khanhdu.backend;

import nashtech.khanhdu.backend.dto.SignUpDto;
import nashtech.khanhdu.backend.entities.Role;
import nashtech.khanhdu.backend.repositories.RoleRepository;
import nashtech.khanhdu.backend.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@EnableJpaAuditing
@EnableTransactionManagement
@CrossOrigin(origins = "http://localhost:3000/")
public class BackendApplication {

    // FOR CREATE ADMIN WHEN DELETE DATABASE
//    @Bean
//    CommandLineRunner commandLineRunner(
//            @Value("password") String initPass,
//            UserService userService,
//            RoleRepository roleRepository) {
//        return args -> {
//            var rolesDefault = List.of("ROLE_USER", "ROLE_ADMIN");
//            List<Role> roles = rolesDefault.stream()
//                    .map(r -> Role.builder().name(r).build())
//                    .map(roleRepository::save)
//                    .toList();
//            Set<String> role = new HashSet<>();
//            roles.forEach((r) -> role.add(r.getName()));
//            var u1 = new SignUpDto("admin", initPass, role, "admin@email.com");
//            userService.signUp(u1);
//        };
//    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
