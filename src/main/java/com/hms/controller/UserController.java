package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.dto.ChangePasswordDTO;
import com.hms.dto.LoginDTO;
import com.hms.dto.LoginResponseDTO;
import com.hms.entity.User;
import com.hms.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Integer id) {

        userService.deleteUser(id);

        return "User Deleted Successfully";
    }

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody LoginDTO loginDTO) {

        return userService.login(loginDTO);
    }

    @GetMapping("/users/pending")
    public List<User> getPendingUsers() {

        return userService.getPendingUsers();
    }

    @PutMapping("/users/approve/{id}")
    public User approveUser(
            @PathVariable Integer id) {

        return userService.approveUser(id);
    }

    @PutMapping("/users/reject/{id}")
    public User rejectUser(
            @PathVariable Integer id) {

        return userService.rejectUser(id);
    }

    @PutMapping("/users/change-password/{id}")
    public User changePassword(

            @PathVariable Integer id,

            @RequestBody ChangePasswordDTO dto) {

        return userService.changePassword(

                id,

                dto.getOldPassword(),

                dto.getNewPassword());
    }
    @GetMapping("/generate")
    public String generate() {
        return new BCryptPasswordEncoder().encode("admin123");
    }

}