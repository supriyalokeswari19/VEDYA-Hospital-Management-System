const API_URL =
"http://localhost:8080";

let userId =
localStorage.getItem("userId");

fetch(API_URL +
"/patients/user/" +
userId)

.then(response => response.json())

.then(patient => {

    return fetch(

    API_URL +

    "/medical-records/patient/" +

    patient.patientId);

})

.then(response => response.json())

.then(data => {

    let container =
    document.getElementById(
    "recordsContainer");

    container.innerHTML = "";

    if(data.length == 0){

        container.innerHTML =

        "<h3>No Medical Records Found</h3>";

        return;

    }

    data.forEach(record => {

		container.innerHTML += `

		<div class="record-card">

		    <div class="record-left">

		        <div class="record-icon">

		            <i class="fa-solid fa-file-medical"></i>

		        </div>

		        <div class="record-details">

		            <h3>${record.diagnosis}</h3>

		            <p><b>Doctor:</b> ${record.doctorName}</p>

		            <p><b>Prescription:</b> ${record.prescription}</p>

		        </div>

		    </div>

		    <div class="record-right">

		        <span class="visit-date">

		            ${record.visitDate}

		        </span>

		    </div>

		</div>

		`;

    });

})

.catch(error => {

    console.log(error);

});