package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.entity.MedicalRecord;

public interface MedicalRecordRepository
extends JpaRepository<MedicalRecord,Integer>{

    List<MedicalRecord> findByDoctorId(Integer doctorId);

    List<MedicalRecord> findByPatientId(Integer patientId);

}