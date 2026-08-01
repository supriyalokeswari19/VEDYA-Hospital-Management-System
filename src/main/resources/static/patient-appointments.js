const API_URL = "https://vedya-hospital-management-system.onrender.com";

let userId =
localStorage.getItem("userId");

fetch(API_URL +
"/patients/user/" +
userId)

.then(response => response.json())

.then(patient => {

    return fetch(

    API_URL +

    "/appointments/patient/" +

    patient.patientId);

})

.then(response => response.json())

.then(data => {

    let container =

    document.getElementById(

    "appointmentsContainer");

    container.innerHTML = "";

    if(data.length == 0){

        container.innerHTML =

        "<h3>No Appointments Found</h3>";

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

		            <i class="fa-solid fa-user-doctor"></i>

		        </div>

		        <div class="appointment-details">

		            <h3>
		                Appointment #${a.appointmentId}
		            </h3>

		            <p>
		                <b>Date:</b> ${a.appointmentDate}
		            </p>

		            <p>
		                <b>Doctor:</b> ${a.doctorName}
		            </p>

		        </div>

		    </div>

		    <div class="appointment-right">

		        <span class="status ${statusClass}">
		            ${a.status}
		        </span>

		    </div>

		</div>

		`;

    });

})

.catch(error => {

    console.log(error);

});