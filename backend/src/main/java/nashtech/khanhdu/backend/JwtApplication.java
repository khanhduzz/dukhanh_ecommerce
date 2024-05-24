//package nashtech.khanhdu.backend;
//
//import lombok.extern.log4j.Log4j2;
//import nashtech.khanhdu.backend.data.entities.Role;
//import nashtech.khanhdu.backend.data.repositories.RoleRepository;
//import nashtech.khanhdu.backend.dto.SignUpDto;
//import nashtech.khanhdu.backend.services.ProductService;
//import nashtech.khanhdu.backend.services.UserService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//import java.util.List;
//
//@SpringBootApplication
//@EnableTransactionManagement
//@EnableJpaAuditing
//@Log4j2
//public class JwtApplication {
//
//    @Bean
//    CommandLineRunner commandLineRunner (
//            @Value("${admin.default.pass}") String initPass,
//            UserService userService,
//            RoleRepository roleRepository) {
//        return args -> {
//            var rolesDefault = List.of("ROLE_USER", "ROLE_ADMIN");
//            List<Role> roles = rolesDefault.stream()
//                    .map(r -> Role.builder().roleName(r).build())
//                    .map(roleRepository::save)
//                    .toList();
//
//            log.info("Roles {}", roles);
//            var u1 = new SignUpDto("admin", initPass, rolesDefault);
//            var u2 = userService.signUp(u1);
//            System.out.println(u2);
//
//            var user = new SignUpDto("user", initPass, List.of("ROLE_USER"));
//            var userDb = userService.signUp(user);
//            System.out.println(userDb);
//        };
//    }
//
//
//    public static void main (String[] args) {
//        SpringApplication.run(JwtApplication.class, args);
//    }
//
//}
