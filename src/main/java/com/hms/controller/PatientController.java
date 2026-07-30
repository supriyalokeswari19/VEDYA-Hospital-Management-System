package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.entity.Patient;
import com.hms.service.PatientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }
    @PostMapping("/patients")
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }
    @GetMapping("/patients/{id}")
    public Optional<Patient> getPatientById(
            @PathVariable Integer id) {

        return patientService.getPatientById(id);
    }
    @PutMapping("/patients/{id}")
    public Patient updatePatient(
            @PathVariable Integer id,
            @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }
    @DeleteMapping("/patients/{id}")
    public String deletePatient(@PathVariable Integer id) {

        patientService.deletePatient(id);

        return "Patient Deleted Successfully";
    }
    @GetMapping("/patients/user/{userId}")
    public Patient getPatientByUserId(
            @PathVariable Integer userId) {

        return patientService.getPatientByUserId(userId);
    }
}