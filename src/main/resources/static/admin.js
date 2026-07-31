const API_URL = "https://vedya-hospital-management-system.onrender.com";
async function getData(endpoint) {

    const response = await fetch(API_URL + endpoint);

    if (!response.ok) {

        throw new Error("Unable to load " + endpoint);

    }

    return await response.json();

}

window.onload = () => {

    checkAdminLogin();

    initializeDashboard();

};

function checkAdminLogin() {

    if (localStorage.getItem("userRole") !== "ADMIN") {

        window.location.href = "login.html";

    }

}

async function initializeDashboard() {

    try {

        await Promise.all([

            loadDoctorCount(),
            loadPatientCount(),
            loadAppointmentCount(),
            loadBillCount(),
            loadRecentAppointments()

        ]);

    } catch (error) {

        console.error(error);

        showError("Unable to load dashboard.");

    }

}	async function loadDoctorCount() {

	    try {

	        const response = await fetch(API_URL + "/doctors");

	        const doctors = await response.json();

	        document.getElementById("doctorCount").innerText =
	            doctors.length;

	    }

	    catch (error) {

	        console.error(error);

	    }

	}	async function loadPatientCount() {

	    try {

			const patients =
			await getData("/patients");

	        document.getElementById("patientCount").innerText =
	            patients.length;

	    }

	    catch (error) {

	        console.error(error);

	    }

	}	async function loadAppointmentCount() {

	    try {

	        const response = await fetch(API_URL + "/appointments");

	        const appointments = await response.json();

	        document.getElementById("appointmentCount").innerText =
	            appointments.length;

	    }

	    catch (error) {

	        console.error(error);

	    }

	}	async function loadBillCount() {

	    try {

			const bills =
			await getData("/bills");

	        document.getElementById("billCount").innerText =
	            bills.length;

	    }

	    catch (error) {

	        console.error(error);

	    }

	}	async function loadRecentAppointments() {

	    try {

			const appointments =
			await getData("/appointments");

	        const container =
	            document.getElementById("recentAppointments");

	        container.innerHTML = "";

	        if (appointments.length === 0) {

	            container.innerHTML =
	                "<p>No recent appointments.</p>";

	            return;

	        }

	        appointments
	            .sort((a, b) => b.appointmentId - a.appointmentId)
	            .slice(0, 5)
	            .forEach(a => {

	                let color = "#ffc107";

	                if (a.status === "COMPLETED")
	                    color = "#28a745";

	                if (a.status === "CANCELLED")
	                    color = "#dc3545";

	                container.innerHTML += `

	                <div class="activity-item">

	                    <div>

	                        <h4>${a.patient.patientName}</h4>

	                        <p>
	                        Appointment #${a.appointmentId}
	                        </p>

	                        <small>
	                        ${a.appointmentDate}
	                        |
	                        ${a.appointmentTime}
	                        </small>

	                    </div>

	                    <span
	                    style="
	                    background:${color};
	                    color:white;
	                    padding:6px 12px;
	                    border-radius:20px;
	                    font-size:13px;
	                    ">

	                    ${a.status}

	                    </span>

	                </div>

	                `;

	            });

	    }

	    catch (error) {

	        console.error(error);

	    }

	}	function logout() {

	    if (confirm("Are you sure you want to logout?")) {

	        localStorage.clear();

	        window.location.href = "login.html";

	    }

	}	function showError(message) {

	    alert(message);

	}	async function globalSearch() {

	    const keyword = document
	        .getElementById("globalSearch")
	        .value
	        .trim()
	        .toLowerCase();

	    const results =
	        document.getElementById("searchResults");

	    results.innerHTML = "";

	    if (keyword === "") return;

	    try {

	        const [

	            doctors,
	            patients,
	            appointments,
	            bills,
	            records

	        ] = await Promise.all([

	            fetch(API_URL + "/doctors").then(r => r.json()),
	            fetch(API_URL + "/patients").then(r => r.json()),
	            fetch(API_URL + "/appointments").then(r => r.json()),
	            fetch(API_URL + "/bills").then(r => r.json()),
	            fetch(API_URL + "/medical-records").then(r => r.json())

	        ]);

	        /* ---------- Doctors ---------- */

	        doctors.forEach(d => {

	            if (

	                d.doctorName &&
	                d.doctorName.toLowerCase().includes(keyword)

	            ) {

	                results.innerHTML += `

	                <div class="result-card">

	                    <h3>👨🏻‍⚕️ Doctor</h3>

	                    <p><b>Name :</b> ${d.doctorName}</p>

	                    <p><b>Specialization :</b> ${d.specialization}</p>

	                    <p><b>Experience :</b> ${d.experienceYears} Years</p>

	                </div>

	                `;

	            }

	        });

	        /* ---------- Patients ---------- */

	        patients.forEach(p => {

	            if (

	                p.patientName &&
	                p.patientName.toLowerCase().includes(keyword)

	            ) {

	                results.innerHTML += `

	                <div class="result-card">

	                    <h3>🧑 Patient</h3>

	                    <p><b>Name :</b> ${p.patientName}</p>

	                    <p><b>Phone :</b> ${p.phone}</p>

	                    <p><b>Gender :</b> ${p.gender}</p>

	                </div>

	                `;

	            }

	        });

	        /* ---------- Appointments ---------- */

	        appointments.forEach(a => {

	            if (

	                a.patient &&
	                a.patient.patientName &&
	                a.patient.patientName.toLowerCase().includes(keyword)

	            ) {

	                results.innerHTML += `

	                <div class="result-card">

	                    <h3>📅 Appointment</h3>

	                    <p><b>Patient :</b> ${a.patient.patientName}</p>

	                    <p><b>Date :</b> ${a.appointmentDate}</p>

	                    <p><b>Time :</b> ${a.appointmentTime}</p>

	                    <p><b>Status :</b> ${a.status}</p>

	                </div>

	                `;

	            }

	        });

	        /* ---------- Bills ---------- */

	        bills.forEach(b => {

	            if (

	                String(b.patientId).includes(keyword)

	            ) {

	                results.innerHTML += `

	                <div class="result-card">

	                    <h3>💳 Bill</h3>

	                    <p><b>Patient ID :</b> ${b.patientId}</p>

	                    <p><b>Amount :</b> ₹${b.amount}</p>

	                    <p><b>Status :</b> ${b.status}</p>

	                </div>

	                `;

	            }

	        });

	        /* ---------- Medical Records ---------- */

	        records.forEach(r => {

	            if (

	                String(r.patientId).includes(keyword)

	            ) {

	                results.innerHTML += `

	                <div class="result-card">

	                    <h3>📋 Medical Record</h3>

	                    <p><b>Patient ID :</b> ${r.patientId}</p>

	                    <p><b>Diagnosis :</b> ${r.diagnosis}</p>

	                    <p><b>Visit :</b> ${r.visitDate}</p>

	                </div>

	                `;

	            }

	        });

	        if (results.innerHTML === "") {

	            results.innerHTML = `

	            <div class="result-card">

	                <h3>No Results Found</h3>

	            </div>

	            `;

	        }

	    }

	    catch (error) {

	        console.error(error);

	        showError("Search failed.");

	    }

	}	function refreshDashboard(){

	   initializeDashboard();

	}		
