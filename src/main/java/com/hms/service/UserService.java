package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.dto.LoginDTO;
import com.hms.dto.LoginResponseDTO;
import com.hms.entity.User;
import com.hms.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()));

        user.setStatus("PENDING");

        return userRepository.save(user);
    }

    public User getUserById(Integer id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + id));
    }

    public User updateUser(
            Integer id,
            User userDetails) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + id));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());

        if(userDetails.getPassword()!=null &&
                !userDetails.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(
                            userDetails.getPassword()));
        }

        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {

        if (!userRepository.existsById(id)) {

            throw new RuntimeException(
                    "User not found with ID: " + id);
        }

        userRepository.deleteById(id);
    }

    public LoginResponseDTO login(LoginDTO loginDTO) {

        User user = userRepository.findByEmail(
                loginDTO.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid Email"));

        if (!user.getStatus().equals("APPROVED")) {

            throw new RuntimeException(
                    "Account Waiting For Admin Approval");
        }
        System.out.println("Email entered: " + loginDTO.getEmail());
        System.out.println("Password entered: " + loginDTO.getPassword());

        System.out.println("DB Email: " + user.getEmail());
        System.out.println("DB Password: " + user.getPassword());
        System.out.println("Role: " + user.getRole());
        System.out.println("Status: " + user.getStatus());

        boolean matched = passwordEncoder.matches(
                loginDTO.getPassword(),
                user.getPassword());

        System.out.println("Password Matched: " + matched);
        if (!passwordEncoder.matches(
                loginDTO.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid Password");
        }

        return new LoginResponseDTO(

                user.getUserId(),

                "Login Successful",

                user.getRole());
    }

    public List<User> getPendingUsers() {

        return userRepository.findByStatus(
                "PENDING");
    }

    public User approveUser(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"));

        user.setStatus("APPROVED");

        return userRepository.save(user);
    }

    public User rejectUser(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"));

        user.setStatus("REJECTED");

        return userRepository.save(user);
    }

    public User changePassword(

            Integer userId,

            String oldPassword,

            String newPassword) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"));

        if (!passwordEncoder.matches(

                oldPassword,

                user.getPassword())) {

            throw new RuntimeException(
                    "Old Password Incorrect");
        }

        user.setPassword(

                passwordEncoder.encode(
                        newPassword));

        return userRepository.save(user);
    }

}