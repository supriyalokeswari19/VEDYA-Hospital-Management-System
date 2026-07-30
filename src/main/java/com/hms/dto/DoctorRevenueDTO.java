package com.hms.dto;

public class DoctorRevenueDTO {

    private Integer doctorId;
    private Long revenue;

    public DoctorRevenueDTO(Integer doctorId, Long revenue) {
        this.doctorId = doctorId;
        this.revenue = revenue;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public Long getRevenue() {
        return revenue;
    }
}