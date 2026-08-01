const API_URL = "https://vedya-hospital-management-system.onrender.com";

window.onload = function () {

    loadAppointments();

};

function loadAppointments() {

    let userId = localStorage.getItem("userId");

    fetch(API_URL + "/doctors/user/" + userId)

    .then(response => response.json())

    .then(doctor => {

        return fetch(
            API_URL +
            "/appointments/doctor/" +
            doctor.doctorId
        );

    })

    .then(response => response.json())

	.then(data => {

	    let container = document.getElementById("appointmentContainer");
	    container.innerHTML = "";

	    if(data.length === 0){

	        container.innerHTML = `
	            <h3>No Appointments Found</h3>
	        `;
	        return;
	    }

	    data.forEach(a => {

	        let statusClass = "";

	        if(a.status === "Completed"){
	            statusClass = "completed";
	        }
	        else if(a.status === "Pending"){
	            statusClass = "pending";
	        }
	        else{
	            statusClass = "cancelled";
	        }

	        container.innerHTML += `

	        <div class="appointment-card">

	            <div class="appointment-left">

	                <div class="appointment-icon">
	                    👤
	                </div>

	                <div class="appointment-details">

	                    <h3>${a.patient.patientName}</h3>

	                    <p><b>Appointment ID:</b> ${a.appointmentId}</p>

	                    <p><b>Date:</b> ${a.appointmentDate}</p>

	                    <p><b>Time:</b> ${a.appointmentTime}</p>

	                </div>

	            </div>

	            <span class="status ${statusClass}">
	                ${a.status}
	            </span>

	        </div>

	        `;

	    });

	})
    .catch(error=>{

        console.log(error);

    });

}