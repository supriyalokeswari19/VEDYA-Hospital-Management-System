package com.hms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.DashboardDTO;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;

@Service
public class DashboardService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardDTO getDashboard() {

        Long doctors = doctorRepository.count();
        Long patients = patientRepository.count();
        Long appointments = appointmentRepository.count();

        return new DashboardDTO(
                doctors,
                patients,
                appointments);
    }
}