package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.Prescription;
import com.hms.service.PrescriptionService;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping
    public List<Prescription> getAllPrescriptions() {
        return prescriptionService.getAllPrescriptions();
    }

    @PostMapping
    public Prescription addPrescription(
            @RequestBody Prescription prescription) {

        return prescriptionService.savePrescription(
                prescription);
    }

    @GetMapping("/{id}")
    public Prescription getPrescriptionById(
            @PathVariable Integer id) {

        return prescriptionService
                .getPrescriptionById(id);
    }

    @PutMapping("/{id}")
    public Prescription updatePrescription(
            @PathVariable Integer id,
            @RequestBody Prescription prescription) {

        return prescriptionService
                .updatePrescription(id,
                        prescription);
    }

    @DeleteMapping("/{id}")
    public String deletePrescription(
            @PathVariable Integer id) {

        prescriptionService
                .deletePrescription(id);

        return "Prescription Deleted Successfully";
    }
    @GetMapping("/appointments")
    public List<Prescription>
    getPrescriptionsByAppointments(

    @RequestParam
    List<Integer> appointmentIds){

        return prescriptionService
                .getPrescriptionsByAppointments(
                        appointmentIds);

    }
    @GetMapping("/patient/{patientId}")
    public List<Prescription> getPrescriptionsByPatientId(

            @PathVariable Integer patientId){

        return prescriptionService
                .getPrescriptionsByPatientId(patientId);

    }
    
}