package com.hms.dto;

public class DoctorAppointmentCountDTO {

    private Integer doctorId;
    private Long totalAppointments;

    public DoctorAppointmentCountDTO(Integer doctorId,
                                     Long totalAppointments) {
        this.doctorId = doctorId;
        this.totalAppointments = totalAppointments;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public Long getTotalAppointments() {
        return totalAppointments;
    }
}