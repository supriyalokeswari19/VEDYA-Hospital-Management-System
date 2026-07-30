package com.hms.dto;

public class DoctorAppointmentDTO {

    private Integer appointmentId;
    private Integer patientId;
    private Integer doctorId;
    private String status;

    public DoctorAppointmentDTO(Integer appointmentId,
                                Integer patientId,
                                Integer doctorId,
                                String status) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.status = status;
    }

    public Integer getAppointmentId() {
        return appointmentId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public String getStatus() {
        return status;
    }
}