package com.javae.assetmanagement.payload.response;

import java.util.List;

public class JwtResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private int expirationDateMs;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, int jwtExpirationMs) {
        this.accessToken = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.expirationDateMs = jwtExpirationMs;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public int getExpirationDateMs() {
        return expirationDateMs;
    }

    public void setExpirationDateMs(int expirationDateMs) {
        this.expirationDateMs = expirationDateMs;
    }
}
