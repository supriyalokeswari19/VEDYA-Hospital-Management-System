package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hms.entity.Bill;

public interface BillRepository
        extends JpaRepository<Bill, Integer> {

	@Query(value = """
	        SELECT
	            b.bill_id,
	            b.patient_id,
	            u.name,
	            b.amount,
	            b.payment_status,
	            b.bill_date
	        FROM bills b
	        JOIN patients p
	            ON b.patient_id = p.patient_id
	        JOIN users u
	            ON p.user_id = u.user_id
	        """, nativeQuery = true)
	List<Object[]> getBillReport();
	List<Bill>
	findByPatientId(Integer patientId);
}