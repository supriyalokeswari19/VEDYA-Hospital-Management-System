package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Bill;
import com.hms.repository.BillRepository;
import java.util.ArrayList;
import com.hms.dto.BillReportDTO;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill saveBill(Bill bill) {
        return billRepository.save(bill);
    }

    public Bill getBillById(Integer id) {
        return billRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found with ID: " + id));
    }

    public Bill updateBill(Integer id, Bill billDetails) {

        Bill bill = billRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found with ID: " + id));

        bill.setPatientId(billDetails.getPatientId());
        bill.setAmount(billDetails.getAmount());
        bill.setBillDate(billDetails.getBillDate());
        bill.setPaymentStatus(billDetails.getPaymentStatus());

        return billRepository.save(bill);
    }

    public void deleteBill(Integer id) {

        if (!billRepository.existsById(id)) {
            throw new RuntimeException("Bill not found with ID: " + id);
        }

        billRepository.deleteById(id);
    }
    public List<BillReportDTO> getBillReport() {

        List<Object[]> results =
                billRepository.getBillReport();

        List<BillReportDTO> report =
                new ArrayList<>();

        for (Object[] row : results) {

            BillReportDTO dto =
                    new BillReportDTO(
                            (Integer) row[0],
                            (Integer) row[1],
                            (String) row[2],
                            (java.math.BigDecimal) row[3],
                            (String) row[4],
                            (java.time.LocalDate) row[5]
                    );

            report.add(dto);
        }

        return report;
    }
    public List<Bill>
    getBillsByPatientId(
    Integer patientId){

        return billRepository
                .findByPatientId(
                        patientId);
    }
}