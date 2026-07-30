package com.hms.dto;

public class LoginResponseDTO {

    private Integer userId;

    private String message;

    private String role;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(
            Integer userId,
            String message,
            String role) {

        this.userId = userId;
        this.message = message;
        this.role = role;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}