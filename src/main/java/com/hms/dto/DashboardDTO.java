package com.hms.dto;

public class DashboardDTO {

    private Long totalDoctors;
    private Long totalPatients;
    private Long totalAppointments;

    public DashboardDTO(Long totalDoctors,
                        Long totalPatients,
                        Long totalAppointments) {
        this.totalDoctors = totalDoctors;
        this.totalPatients = totalPatients;
        this.totalAppointments = totalAppointments;
    }

    public Long getTotalDoctors() {
        return totalDoctors;
    }

    public Long getTotalPatients() {
        return totalPatients;
    }

    public Long getTotalAppointments() {
        return totalAppointments;
    }
}