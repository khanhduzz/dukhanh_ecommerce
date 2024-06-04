package nashtech.khanhdu.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider      tokenProvider;
    private final UserDetailsService userService;
    private final TokenBlacklistService tokenBlacklistService;

    public JwtAuthenticationFilter (TokenProvider tokenProvider, UserDetailsService userService, TokenBlacklistService tokenBlacklistService) {
        this.tokenProvider = tokenProvider;
        this.userService = userService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        var token = this.recoverToken(request);
        if ( token != null && !tokenBlacklistService.isBlacklisted(token)) {
            var login = tokenProvider.validateToken(token);
            var user = userService.loadUserByUsername(login);
            System.out.println(user.getAuthorities());
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken (HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if ( authHeader == null ) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}
