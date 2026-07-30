package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Appointment;
import com.hms.repository.AppointmentRepository;

import com.hms.dto.AppointmentReportDTO;

import com.hms.dto.DoctorAppointmentDTO;

import com.hms.dto.DoctorAppointmentCountDTO;
import com.hms.dto.DoctorRevenueDTO;
import java.util.ArrayList;
import java.time.LocalDate;
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Save appointment
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get appointment by ID
    public Appointment getAppointmentById(Integer id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found with ID: " + id));
    }

    // Update appointment
    public Appointment updateAppointment(
            Integer id,
            Appointment appointmentDetails) {

        Appointment appointment =
                appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Appointment not found with ID: " + id));

        appointment.setPatient(
                appointmentDetails.getPatient());

        appointment.setDoctorId(
                appointmentDetails.getDoctorId());

        appointment.setAppointmentDate(
                appointmentDetails.getAppointmentDate());

        appointment.setAppointmentTime(
                appointmentDetails.getAppointmentTime());

        appointment.setStatus(
                appointmentDetails.getStatus());

        return appointmentRepository.save(
                appointment);
    }
    public List<Appointment> getAppointmentsByDoctorId(
            Integer doctorId){

        return appointmentRepository
                .findByDoctorId(doctorId);
    }

    public List<Appointment> getAppointmentsByPatientId(
            Integer patientId){

        return appointmentRepository
                .findByPatient_PatientId(patientId);
    }

    // Delete appointment
    public void deleteAppointment(Integer id) {

        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found with ID: " + id);
        }

        appointmentRepository.deleteById(id);
    }
    public List<AppointmentReportDTO> getAppointmentReport() {

        List<Object[]> results =
                appointmentRepository.getAppointmentReport();

        List<AppointmentReportDTO> report =
                new ArrayList<>();

        for (Object[] row : results) {

            AppointmentReportDTO dto =
                    new AppointmentReportDTO(
                            (Integer) row[0],
                            (Integer) row[1],
                            (Integer) row[2],
                            (String) row[3],
                            (String) row[4]);

            report.add(dto);
        }

        return report;
    }
    public List<DoctorAppointmentDTO> getAppointmentsByDoctor(Integer doctorId) {

        List<Object[]> results =
                appointmentRepository.getAppointmentsByDoctor(doctorId);

        List<DoctorAppointmentDTO> report =
                new ArrayList<>();

        for (Object[] row : results) {

            DoctorAppointmentDTO dto =
                    new DoctorAppointmentDTO(
                            (Integer) row[0],
                            (Integer) row[1],
                            (Integer) row[2],
                            (String) row[3]);

            report.add(dto);
        }

        return report;
    }
    public List<DoctorAppointmentCountDTO> getDoctorAppointmentCount() {

        List<Object[]> results =
                appointmentRepository.getDoctorAppointmentCount();

        List<DoctorAppointmentCountDTO> report =
                new ArrayList<>();

        for(Object[] row : results) {

            DoctorAppointmentCountDTO dto =
                    new DoctorAppointmentCountDTO(
                            ((Number) row[0]).intValue(),
                            ((Number) row[1]).longValue());

            report.add(dto);
        }

        return report;
    }
    public List<DoctorRevenueDTO> getDoctorRevenueReport() {

        List<Object[]> results =
                appointmentRepository.getDoctorRevenueReport();

        List<DoctorRevenueDTO> report =
                new ArrayList<>();

        for(Object[] row : results) {

            DoctorRevenueDTO dto =
                    new DoctorRevenueDTO(
                            ((Number) row[0]).intValue(),
                            ((Number) row[1]).longValue());

            report.add(dto);
        }

        return report;
    }
   

    public List<Appointment> getTodayAppointments(Integer doctorId){

        return appointmentRepository
                .findByDoctorIdAndAppointmentDate(
                        doctorId,
                        LocalDate.now());
    }
}