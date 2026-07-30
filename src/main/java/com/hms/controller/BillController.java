package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hms.entity.Bill;
import com.hms.service.BillService;
import com.hms.dto.BillReportDTO;

@RestController
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/bills")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @PostMapping("/bills")
    public Bill addBill(@RequestBody Bill bill) {
        return billService.saveBill(bill);
    }

    @GetMapping("/bills/{id}")
    public Bill getBillById(@PathVariable Integer id) {
        return billService.getBillById(id);
    }

    @PutMapping("/bills/{id}")
    public Bill updateBill(
            @PathVariable Integer id,
            @RequestBody Bill bill) {

        return billService.updateBill(id, bill);
    }

    @DeleteMapping("/bills/{id}")
    public String deleteBill(@PathVariable Integer id) {

        billService.deleteBill(id);

        return "Bill Deleted Successfully";
    }
    @GetMapping("/bills/report")
    public List<BillReportDTO> getBillReport() {

        return billService.getBillReport();
    }
    @GetMapping("/bills/patient/{patientId}")
    public List<Bill>
    getBillsByPatientId(

    @PathVariable
    Integer patientId){

        return billService
                .getBillsByPatientId(
                        patientId);
    }
}