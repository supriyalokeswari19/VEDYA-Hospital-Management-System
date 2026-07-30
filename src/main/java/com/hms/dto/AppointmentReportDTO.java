package com.hms.dto;

public class AppointmentReportDTO {

    private Integer appointmentId;
    private Integer patientId;
    private Integer doctorId;
    private String specialization;
    private String status;

    public AppointmentReportDTO() {
    }

    public AppointmentReportDTO(Integer appointmentId,
                                Integer patientId,
                                Integer doctorId,
                                String specialization,
                                String status) {

        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.specialization = specialization;
        this.status = status;
    }

    public Integer getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Integer appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}