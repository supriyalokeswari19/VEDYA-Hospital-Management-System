package com.hms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.dto.AppointmentReportDTO;
import com.hms.dto.DoctorAppointmentCountDTO;
import com.hms.dto.DoctorAppointmentDTO;
import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;
import com.hms.dto.DoctorRevenueDTO;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Get All Appointments
    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // Add Appointment
    @PostMapping("/appointments")
    public Appointment addAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService.saveAppointment(appointment);
    }

    // Report Query
    @GetMapping("/appointments/report")
    public List<AppointmentReportDTO> getAppointmentReport() {

        return appointmentService.getAppointmentReport();
    }

    // Group By Query
    @GetMapping("/appointments/count")
    public List<DoctorAppointmentCountDTO> getDoctorAppointmentCount() {

        return appointmentService.getDoctorAppointmentCount();
    }

    // Doctor-wise Appointments
   

    // Get Appointment By Id
    @GetMapping("/appointments/{id}")
    public Optional<Appointment> getAppointmentById(
            @PathVariable Integer id) {

        return Optional.of(
                appointmentService.getAppointmentById(id));
    }

    // Update Appointment
    @PutMapping("/appointments/{id}")
    public Appointment updateAppointment(
            @PathVariable Integer id,
            @RequestBody Appointment appointment) {

        return appointmentService.updateAppointment(id, appointment);
    }

    // Delete Appointment
    @DeleteMapping("/appointments/{id}")
    public String deleteAppointment(
            @PathVariable Integer id) {

        appointmentService.deleteAppointment(id);

        return "Appointment Deleted Successfully";
    }
    @GetMapping("/appointments/revenue")
    public List<DoctorRevenueDTO> getDoctorRevenueReport() {

        return appointmentService.getDoctorRevenueReport();
    }
    @GetMapping("/appointments/doctor/{doctorId}")
    public List<Appointment>
    getAppointmentsByDoctorId(
    @PathVariable Integer doctorId){

        return appointmentService
                .getAppointmentsByDoctorId(
                        doctorId);
    }
    @GetMapping("/appointments/patient/{patientId}")
    public List<Appointment>
    getAppointmentsByPatientId(
    @PathVariable Integer patientId){

        return appointmentService
                .getAppointmentsByPatientId(
                        patientId);
    }
    @GetMapping("/appointments/doctor/{doctorId}/today")
    public List<Appointment>
    getTodayAppointments(
    @PathVariable Integer doctorId){

        return appointmentService
                .getTodayAppointments(
                        doctorId);
    }
}