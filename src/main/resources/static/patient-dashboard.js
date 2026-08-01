const API_URL = "https://vedya-hospital-management-system.onrender.com";

window.onload = function () {

    loadDashboard();

    loadRecentActivity();

};
function loadDashboard() {

    let userId = localStorage.getItem("userId");

    fetch(API_URL + "/patients/user/" + userId)

    .then(response => response.json())

    .then(patient => {

        document.getElementById("patientName").innerHTML =
        patient.patientName;

        document.getElementById("patientWelcome").innerHTML =
        "Welcome back, " + patient.patientName + " 👋";

        // Appointments
        fetch(API_URL + "/appointments/patient/" + patient.patientId)
        .then(r => r.json())
        .then(data => {

            document.getElementById("appointmentCount").innerHTML =
            data.length;

        });

        // Medical Records
        fetch(API_URL + "/medical-records/patient/" + patient.patientId)
        .then(r => r.json())
        .then(data => {

            document.getElementById("recordCount").innerHTML =
            data.length;

        });

        // Prescriptions
        fetch(API_URL + "/prescriptions/patient/" + patient.patientId)
        .then(r => r.json())
        .then(data => {

            document.getElementById("prescriptionCount").innerHTML =
            data.length;

        });

        // Bills
        fetch(API_URL + "/bills/patient/" + patient.patientId)
        .then(r => r.json())
        .then(data => {

            document.getElementById("billCount").innerHTML =
            data.length;

        });

    });

}

function loadRecentActivity(){

    let userId =
    localStorage.getItem(
    "userId");

    fetch(API_URL +
    "/patients/user/" +
    userId)

    .then(response =>
    response.json())

    .then(patient => {

        return fetch(
        API_URL +
        "/appointments/patient/" +
        patient.patientId);
    })

    .then(response =>
    response.json())

    .then(data => {

        let container =
        document.getElementById(
        "patientActivity");

        container.innerHTML = "";

        if(data.length === 0){

            container.innerHTML =
            "<p>No Appointments Found</p>";

            return;
        }

        data.reverse().forEach(a => {

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

			<div class="activity-item">

			    <div class="activity-left">

			        <div class="activity-icon">

			            <i class="fa-solid fa-calendar-check"></i>

			        </div>

			        <div class="activity-details">

			            <h3>
			                Appointment #${a.appointmentId}
			            </h3>

			            <p>

			                ${a.appointmentDate}

			            </p>

			        </div>

			    </div>

			    <span class="status ${statusClass}">

			        ${a.status}

			    </span>

			</div>

			`;
        });
    })

    .catch(error => {

        console.log(error);
    });
}

if(localStorage.getItem(
"userRole") !== "PATIENT"){

    window.location.href =
    "login.html";
}

function logout(){

    localStorage.clear();

    window.location.href =
    "login.html";
}