package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.MedicalRecord;
import com.hms.service.MedicalRecordService;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @PostMapping
    public MedicalRecord addMedicalRecord(
            @RequestBody MedicalRecord medicalRecord) {

        return medicalRecordService
                .saveMedicalRecord(medicalRecord);
    }

    @GetMapping("/{id}")
    public MedicalRecord getMedicalRecordById(
            @PathVariable Integer id) {

        return medicalRecordService
                .getMedicalRecordById(id);
    }

    @PutMapping("/{id}")
    public MedicalRecord updateMedicalRecord(
            @PathVariable Integer id,
            @RequestBody MedicalRecord medicalRecord) {

        return medicalRecordService
                .updateMedicalRecord(id,
                        medicalRecord);
    }

    @DeleteMapping("/{id}")
    public String deleteMedicalRecord(
            @PathVariable Integer id) {

        medicalRecordService
                .deleteMedicalRecord(id);

        return "Medical Record Deleted Successfully";
    }
    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord>
    getMedicalRecordsByPatientId(
    @PathVariable Integer patientId){

        return medicalRecordService
                .getMedicalRecordsByPatientId(patientId);

    }
    @GetMapping("/doctor/{doctorId}")
    public List<MedicalRecord> getMedicalRecordsByDoctor(
            @PathVariable Integer doctorId){

        return medicalRecordService.getMedicalRecordsByDoctor(doctorId);

    }
}