package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.entity.Prescription;
import com.hms.repository.PrescriptionRepository;
import com.hms.entity.Appointment;
import com.hms.repository.AppointmentRepository;
@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public Prescription savePrescription(
            Prescription prescription) {

        return prescriptionRepository.save(
                prescription);
    }

    public Prescription getPrescriptionById(
            Integer id) {

        return prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription not found with ID: "
                                        + id));
    }

    public Prescription updatePrescription(
            Integer id,
            Prescription prescriptionDetails) {

        Prescription prescription =
                prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription not found with ID: "
                                        + id));

        prescription.setAppointmentId(
                prescriptionDetails.getAppointmentId());

        prescription.setMedicine(
                prescriptionDetails.getMedicine());

        prescription.setDosage(
                prescriptionDetails.getDosage());

        prescription.setInstructions(
                prescriptionDetails.getInstructions());

        return prescriptionRepository.save(
                prescription);
    }

    public void deletePrescription(
            Integer id) {

        if (!prescriptionRepository.existsById(id)) {

            throw new RuntimeException(
                    "Prescription not found with ID: "
                            + id);
        }

        prescriptionRepository.deleteById(id);
    }
    public List<Prescription>
    getPrescriptionsByAppointments(
    List<Integer> appointmentIds){

        return prescriptionRepository
                .findByAppointmentIdIn(
                        appointmentIds);

    }
    public List<Prescription> getPrescriptionsByPatientId(Integer patientId) {

        List<Integer> appointmentIds = appointmentRepository
                .findByPatient_PatientId(patientId)
                .stream()
                .map(Appointment::getAppointmentId)
                .toList();

        return prescriptionRepository.findByAppointmentIdIn(appointmentIds);
    }
}