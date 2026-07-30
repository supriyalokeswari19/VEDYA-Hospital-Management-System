package com.hms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BillReportDTO {

    private Integer billId;
    private Integer patientId;
    private String patientName;
    private BigDecimal amount;
    private String paymentStatus;
    private LocalDate billDate;

    public BillReportDTO() {
    }

    public BillReportDTO(
            Integer billId,
            Integer patientId,
            String patientName,
            BigDecimal amount,
            String paymentStatus,
            LocalDate billDate) {

        this.billId = billId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.billDate = billDate;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }
}