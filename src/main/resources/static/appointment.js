const API_URL = "https://vedya-hospital-management-system.onrender.com/appointments";

window.onload = function () {

    loadAppointments();

    loadPatients();

    loadDoctors();

};

// ================= LOAD APPOINTMENTS =================

function loadAppointments() {

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        let table =
        document.getElementById("appointmentTable");

        table.innerHTML = "";

        data.forEach(a => {

            let statusClass = "";

            if(a.status === "Scheduled"){

                statusClass = "scheduled";

            }
            else if(a.status === "Completed"){

                statusClass = "completed";

            }
            else{

                statusClass = "cancelled";

            }

            table.innerHTML += `

            <tr>

                <td>${a.appointmentId}</td>

                <td>${a.patient.patientName}</td>

                <td>${a.doctorId}</td>

                <td>${a.appointmentDate}</td>

                <td>${a.appointmentTime}</td>

                <td>

                    <span class="status ${statusClass}">

                        ${a.status}

                    </span>

                </td>

                <td>

                    <button
                    class="edit-btn"
                    onclick="editAppointment(${a.appointmentId})">

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteAppointment(${a.appointmentId})">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    })

    .catch(error => {

        console.log(error);

        alert("Unable to load appointments.");

    });

}

// ================= LOAD PATIENTS =================

function loadPatients(){

    fetch(`${API_URL}/patients`)

    .then(response => response.json())

    .then(data => {

        let patientSelect =
        document.getElementById("patientId");

        patientSelect.innerHTML = "";

        data.forEach(patient => {

            patientSelect.innerHTML += `

            <option value="${patient.patientId}">

                ${patient.patientName}

            </option>

            `;

        });

    });

}

// ================= LOAD DOCTORS =================

function loadDoctors(){

    fetch(`${API_URL}/doctors`)

    .then(response => response.json())

    .then(data => {

        let doctorSelect =
        document.getElementById("doctorId");

        doctorSelect.innerHTML = "";

        data.forEach(doctor => {

            doctorSelect.innerHTML += `

            <option value="${doctor.doctorId}">

                ${doctor.doctorName}

            </option>

            `;

        });

    });

}	// ================= SAVE APPOINTMENT =================

	function saveAppointment() {

	    let id = document.getElementById("appointmentId").value;

	    let appointment = {

	        patient: {

	            patientId:
	            document.getElementById("patientId").value

	        },

	        doctorId:
	        document.getElementById("doctorId").value,

	        appointmentDate:
	        document.getElementById("appointmentDate").value,

	        appointmentTime:
	        document.getElementById("appointmentTime").value,

	        status:
	        document.getElementById("status").value

	    };

	    // Validation

	    if (

	        appointment.patient.patientId === "" ||

	        appointment.doctorId === "" ||

	        appointment.appointmentDate === "" ||

	        appointment.appointmentTime === ""

	    ) {

	        alert("Please fill all fields.");

	        return;

	    }

	    let url = API_URL;

	    let method = "POST";

	    if (id !== "") {

	        url = API_URL + "/" + id;

	        method = "PUT";

	    }

	    fetch(url, {

	        method: method,

	        headers: {

	            "Content-Type": "application/json"

	        },

	        body: JSON.stringify(appointment)

	    })

	    .then(response => {

	        if (!response.ok) {

	            throw new Error("Unable to save appointment.");

	        }

	        return response.json();

	    })

	    .then(data => {

	        alert(

	            id === ""

	            ? "Appointment added successfully."

	            : "Appointment updated successfully."

	        );

	        loadAppointments();

	        resetForm();

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Unable to save appointment.");

	    });

	}

	// ================= EDIT =================

	function editAppointment(id) {

	    fetch(API_URL + "/" + id)

	    .then(response => response.json())

	    .then(a => {

	        document.getElementById("appointmentId").value =
	        a.appointmentId;

	        document.getElementById("patientId").value =
	        a.patient.patientId;

	        document.getElementById("doctorId").value =
	        a.doctorId;

	        document.getElementById("appointmentDate").value =
	        a.appointmentDate;

	        document.getElementById("appointmentTime").value =
	        a.appointmentTime;

	        document.getElementById("status").value =
	        a.status;

	        window.scrollTo({

	            top:0,

	            behavior:"smooth"

	        });

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Unable to load appointment.");

	    });

	}

	// ================= DELETE =================

	function deleteAppointment(id) {

	    if (!confirm("Delete this appointment?")) {

	        return;

	    }

	    fetch(API_URL + "/" + id, {

	        method: "DELETE"

	    })

	    .then(response => response.text())

	    .then(message => {

	        alert(message);

	        loadAppointments();

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Unable to delete appointment.");

	    });

	}

	// ================= RESET FORM =================

	function resetForm() {

	    document.getElementById("appointmentId").value = "";

	    document.getElementById("patientId").selectedIndex = 0;

	    document.getElementById("doctorId").selectedIndex = 0;

	    document.getElementById("appointmentDate").value = "";

	    document.getElementById("appointmentTime").value = "";

	    document.getElementById("status").value = "Scheduled";

	}