const API_URL =
"https://your-render-app.onrender.com";

window.onload = function () {

    loadDoctorDashboard();

};
function loadDoctorDashboard() {

    let userId = localStorage.getItem("userId");

    fetch(API_URL + "/doctors/user/" + userId)

    .then(response => response.json())

    .then(doctor => {

		document.getElementById("doctorWelcome").innerHTML =
		"Welcome  <strong>" +
		doctor.doctorName +
		"</strong> 👋";

		document.getElementById("doctorName").innerText =
		 doctor.doctorName;

        loadAppointments(doctor.doctorId);

    })

    .catch(error => console.log(error));

}

function loadAppointments(doctorId){

	fetch(API_URL + "/appointments/doctor/" + doctorId)
    .then(response =>
    response.json())

    .then(data => {

        console.log(
        "Appointments:",
        data);

        let container =
        document.getElementById(
        "doctorAppointments");

        container.innerHTML = "";
		// ===== Statistics =====

		// Today's Appointments
		let today = new Date().toISOString().split("T")[0];

		let todayAppointments = data.filter(a => a.appointmentDate === today);

		document.getElementById("todayAppointmentCount").innerText =
		todayAppointments.length;

		// Total Appointments
		document.getElementById("appointmentCount").innerText =
		data.length;

		// Unique Patients
		let uniquePatients = new Set();

		data.forEach(a => {

		    uniquePatients.add(a.patient.patientId);

		});

		document.getElementById("patientCount").innerText =
		uniquePatients.size;

		// Medical Records Count
		fetch(API_URL + "/medical-records/doctor/" + doctorId)

		.then(res => res.json())

		.then(records => {
			console.log(records);
		    document.getElementById("recordCount").innerText =
		    records.length;

		});
        data.forEach(a => {

			container.innerHTML += `

			<div class="activity">

			<h3>

			👤 ${a.patient.patientName}

			</h3>

			<p>

			📅 ${a.appointmentDate}

			</p>

			<p>

			🕒 ${a.appointmentTime}

			</p>

			<p>

			📌 Status :

			<b>${a.status}</b>

			</p>

			</div>

			`;
        });
    })

    .catch(error => {

        console.log(error);
    });
}

if(localStorage.getItem(
"userRole") !== "DOCTOR"){

    window.location.href =
    "login.html";
}

function logout(){

    localStorage.clear();

    window.location.href =
    "login.html";
}
