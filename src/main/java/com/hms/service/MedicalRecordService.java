package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.MedicalRecord;
import com.hms.repository.MedicalRecordRepository;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }

    public MedicalRecord saveMedicalRecord(
            MedicalRecord medicalRecord) {

        return medicalRecordRepository.save(
                medicalRecord);
    }

    public MedicalRecord getMedicalRecordById(
            Integer id) {

        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Medical Record not found with ID: " + id));
    }

    public MedicalRecord updateMedicalRecord(
            Integer id,
            MedicalRecord recordDetails) {

        MedicalRecord record =
                medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Medical Record not found with ID: " + id));

        record.setPatientId(recordDetails.getPatientId());
        record.setDoctorId(recordDetails.getDoctorId());
        record.setDiagnosis(recordDetails.getDiagnosis());
        record.setPrescription(recordDetails.getPrescription());
        record.setVisitDate(recordDetails.getVisitDate());

        return medicalRecordRepository.save(record);
    }

    public void deleteMedicalRecord(Integer id) {

        if (!medicalRecordRepository.existsById(id)) {
            throw new RuntimeException(
                    "Medical Record not found with ID: " + id);
        }

        medicalRecordRepository.deleteById(id);
    }
    public List<MedicalRecord> getMedicalRecordsByPatientId(
            Integer patientId){

        return medicalRecordRepository
                .findByPatientId(patientId);

    }
    public List<MedicalRecord> getMedicalRecordsByDoctor(
            Integer doctorId){

        return medicalRecordRepository
                .findByDoctorId(doctorId);

    }
}