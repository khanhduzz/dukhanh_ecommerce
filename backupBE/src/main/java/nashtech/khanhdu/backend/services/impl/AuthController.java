package nashtech.khanhdu.backend.services.impl;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.dto.JwtToken;
import nashtech.khanhdu.backend.dto.SignInDto;
import nashtech.khanhdu.backend.entities.User;
import nashtech.khanhdu.backend.jwt.TokenProvider;
import nashtech.khanhdu.backend.jwt.TokenBlacklistService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenBlacklistService tokenBlacklistService;
    private final TokenProvider tokenProvider;

    public AuthController (AuthenticationManager authenticationManager, TokenBlacklistService tokenBlacklistService, TokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenBlacklistService = tokenBlacklistService;
        this.tokenProvider = tokenProvider;
    }


    @PostMapping(
            path = "/auth/signin",
            consumes = { MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE })

    public ResponseEntity<JwtToken> signIn (@RequestBody @Valid SignInDto data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
            var authUser = authenticationManager.authenticate(usernamePassword);
            var accessToken = tokenProvider.generateAccessToken((User) authUser.getPrincipal());
            return ResponseEntity.ok(new JwtToken(accessToken));
        } catch (AuthenticationException e) {
            return ResponseEntity.ok().body(new JwtToken(""));
        }
    }

    @PostMapping("/auth/logout")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        tokenBlacklistService.addToBlacklist(jwtToken);
        return ResponseEntity.ok("Logout successfully");
    }

    @GetMapping("/me")
    ResponseEntity<String> me (Authentication authentication) {
        if (authentication.getPrincipal() instanceof User user) {
            return ResponseEntity.ok().body(user.getUsername() + " " + user.getId());
        }
        return ResponseEntity.badRequest().build();
    }
}
