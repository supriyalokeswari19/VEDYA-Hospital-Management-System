package com.hms.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hms.entity.Appointment;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Integer> {

    @Query(value = """
            SELECT
                a.appointment_id,
                a.patient_id,
                a.doctor_id,
                d.specialization,
                a.status
            FROM appointments a
            JOIN doctors d
            ON a.doctor_id = d.doctor_id
            """, nativeQuery = true)
    List<Object[]> getAppointmentReport();

    @Query(value = """
            SELECT
                appointment_id,
                patient_id,
                doctor_id,
                status
            FROM appointments
            WHERE doctor_id = :doctorId
            """, nativeQuery = true)
    List<Object[]> getAppointmentsByDoctor(Integer doctorId);

    @Query(value = """
            SELECT
                doctor_id,
                COUNT(*) as total_appointments
            FROM appointments
            GROUP BY doctor_id
            """, nativeQuery = true)
    List<Object[]> getDoctorAppointmentCount();

    @Query(value = """
            SELECT
                doctor_id,
                COUNT(*) * 500 as revenue
            FROM appointments
            GROUP BY doctor_id
            """, nativeQuery = true)
    List<Object[]> getDoctorRevenueReport();

    // Doctor's appointments
    List<Appointment> findByDoctorId(Integer doctorId);

    // Patient's appointments
    List<Appointment> findByPatient_PatientId(Integer patientId);

    // Today's appointments
    List<Appointment> findByDoctorIdAndAppointmentDate(
            Integer doctorId,
            LocalDate appointmentDate);
}