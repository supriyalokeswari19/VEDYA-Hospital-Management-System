package com.hms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Doctor;
import com.hms.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    public Doctor getDoctorByUserId(
            Integer userId) {

        return doctorRepository
                .findByUserId(userId);}
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Optional<Doctor> getDoctorById(Integer id) {
        return doctorRepository.findById(id);
    }

    public Doctor updateDoctor(Integer id, Doctor doctorDetails) {

        Optional<Doctor> optionalDoctor =
                doctorRepository.findById(id);

        if (optionalDoctor.isPresent()) {

            Doctor doctor = optionalDoctor.get();

            doctor.setSpecialization(
                    doctorDetails.getSpecialization());

            doctor.setExperienceYears(
                    doctorDetails.getExperienceYears());

            doctor.setConsultationFee(
                    doctorDetails.getConsultationFee());

            return doctorRepository.save(doctor);
        }

        return null;
    }
    public void deleteDoctor(Integer id) {
        doctorRepository.deleteById(id);
    }
    
}