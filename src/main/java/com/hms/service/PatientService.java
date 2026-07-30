package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Patient;
import com.hms.repository.PatientRepository;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Patient getPatientByUserId(
            Integer userId) {

        return patientRepository
                .findByUserId(userId);
    }
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Optional<Patient> getPatientById(Integer id) {
        return patientRepository.findById(id);
    }
    public Patient updatePatient(Integer id, Patient patientDetails) {

        Optional<Patient> optionalPatient =
                patientRepository.findById(id);

        if(optionalPatient.isPresent()) {

            Patient patient = optionalPatient.get();

            patient.setAge(patientDetails.getAge());
            patient.setGender(patientDetails.getGender());
            patient.setPhone(patientDetails.getPhone());
            patient.setAddress(patientDetails.getAddress());
            patient.setBloodGroup(patientDetails.getBloodGroup());

            return patientRepository.save(patient);
        }

        return null;
    }
    public void deletePatient(Integer id) {
        patientRepository.deleteById(id);
    }
    
}