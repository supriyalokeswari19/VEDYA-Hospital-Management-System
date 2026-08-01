const API_URL = "https://vedya-hospital-management-system.onrender.com";

window.onload = function(){

    loadPatientHistory();

};

function loadPatientHistory(){

    let userId =
    localStorage.getItem("userId");

    fetch(API_URL +
    "/doctors/user/" +
    userId)

    .then(response => response.json())

    .then(doctor => {

        return fetch(
        API_URL +
        "/medical-records/doctor/" +
        doctor.doctorId);

    })

    .then(response => response.json())

    .then(data => {

		let container = document.getElementById("historyContainer");
		container.innerHTML="";

        if(data.length===0){

            container.innerHTML==`

            <tr>

            <td colspan="5">

            No Medical Records Found

            </td>

            </tr>

            `;

            return;

        }

		data.forEach(record=>{

		container.innerHTML += `

		<div class="history-card">

		    <div class="history-left">

		        <div class="history-icon">

		            <i class="fa-solid fa-notes-medical"></i>

		        </div>

		        <div class="history-details">

		            <h3>Patient ID : ${record.patientId}</h3>

		            <p>

		                <b>Record ID :</b>

		                ${record.recordId}

		            </p>

		            <p>

		                <b>Diagnosis :</b>

		                ${record.diagnosis}

		            </p>

		            <p>

		                <b>Prescription :</b>

		                ${record.prescription}

		            </p>

		        </div>

		    </div>

		    <div>

		        <span class="visit-date">

		            ${record.visitDate}

		        </span>

		    </div>

		</div>

		`;

		});
    })

    .catch(error=>{

        console.log(error);

    });

}