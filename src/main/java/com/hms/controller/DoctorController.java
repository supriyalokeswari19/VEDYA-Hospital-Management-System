package com.hms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.entity.Doctor;
import com.hms.service.DoctorService;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @PostMapping("/doctors")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping("/doctors/{id}")
    public Optional<Doctor> getDoctorById(
            @PathVariable Integer id) {

        return doctorService.getDoctorById(id);
    }

    @PutMapping("/doctors/{id}")
    public Doctor updateDoctor(
            @PathVariable Integer id,
            @RequestBody Doctor doctor) {

        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/doctors/{id}")
    public String deleteDoctor(
            @PathVariable Integer id) {

        doctorService.deleteDoctor(id);

        return "Doctor Deleted Successfully";
    }
    @GetMapping("/doctors/user/{userId}")
    public Doctor getDoctorByUserId(
            @PathVariable Integer userId) {

        return doctorService.getDoctorByUserId(userId);
    }
    
}