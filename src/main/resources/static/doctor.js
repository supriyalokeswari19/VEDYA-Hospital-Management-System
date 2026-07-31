const API_URL = "https://your-render-app.onrender.com/doctors";

window.onload = () => {

    loadDoctors();

};

async function loadDoctors() {

    try{

        const response = await fetch(API_URL);

        const doctors = await response.json();

        displayDoctors(doctors);

        updateStatistics(doctors);

    }

    catch(error){

        console.error(error);

        alert("Unable to load doctors.");

    }

}

function displayDoctors(doctors){

    const table =
    document.getElementById("doctorTable");

    table.innerHTML = "";

    if(doctors.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="6">

                No Doctors Available

            </td>

        </tr>

        `;

        return;

    }

    doctors.forEach(doctor=>{

        table.innerHTML += `

        <tr>

            <td>${doctor.doctorId}</td>

            <td>${doctor.doctorName}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.experienceYears}</td>

            <td>₹${doctor.consultationFee}</td>

            <td>

                <button
                class="edit-btn"
                onclick="editDoctor(${doctor.doctorId})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteDoctor(${doctor.doctorId})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

function updateStatistics(doctors){

    const count =
    document.getElementById("doctorCount");

    if(count){

        count.innerText =
        doctors.length;

    }

}	function searchDoctor() {

	    const keyword = document
	        .getElementById("searchDoctor")
	        .value
	        .toLowerCase();

	    const rows = document.querySelectorAll("#doctorTable tr");

	    rows.forEach(row => {

	        row.style.display =
	            row.innerText.toLowerCase().includes(keyword)
	            ? ""
	            : "none";

	    });

	}	function clearForm() {

	    document.getElementById("doctorId").value = "";
	    document.getElementById("doctorName").value = "";
	    document.getElementById("specialization").value = "";
	    document.getElementById("experienceYears").value = "";
	    document.getElementById("consultationFee").value = "";

	}	function saveDoctor() {

	    const id =
	        document.getElementById("doctorId").value;

	    const doctor = {

	        doctorName:
	            document.getElementById("doctorName").value.trim(),

	        specialization:
	            document.getElementById("specialization").value.trim(),

	        experienceYears:
	            document.getElementById("experienceYears").value,

	        consultationFee:
	            document.getElementById("consultationFee").value

	    };

	    if (
	        doctor.doctorName === "" ||
	        doctor.specialization === "" ||
	        doctor.experienceYears === "" ||
	        doctor.consultationFee === ""
	    ) {

	        alert("Please fill all fields.");

	        return;

	    }

	    const method = id === "" ? "POST" : "PUT";

	    const url =
	        id === ""
	            ? API_URL
	            : API_URL + "/" + id;

	    fetch(url, {

	        method: method,

	        headers: {

	            "Content-Type": "application/json"

	        },

	        body: JSON.stringify(doctor)

	    })

	    .then(response => response.json())

	    .then(() => {

	        alert(
	            id === ""
	            ? "Doctor Added Successfully"
	            : "Doctor Updated Successfully"
	        );

	        clearForm();

	        loadDoctors();

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Unable to save doctor.");

	    });

	}	function editDoctor(id) {

	    fetch(API_URL + "/" + id)

	    .then(response => response.json())

	    .then(doctor => {

	        document.getElementById("doctorId").value =
	            doctor.doctorId;

	        document.getElementById("doctorName").value =
	            doctor.doctorName;

	        document.getElementById("specialization").value =
	            doctor.specialization;

	        document.getElementById("experienceYears").value =
	            doctor.experienceYears;

	        document.getElementById("consultationFee").value =
	            doctor.consultationFee;

	        window.scrollTo({

	            top: 0,

	            behavior: "smooth"

	        });

	    })

	    .catch(error => {

	        console.error(error);

	    });

	}	function deleteDoctor(id) {

	    if (!confirm("Delete this doctor?")) {

	        return;

	    }

	    fetch(API_URL + "/" + id, {

	        method: "DELETE"

	    })

	    .then(response => response.text())

	    .then(message => {

	        alert(message);

	        loadDoctors();

	    })

	    .catch(error => {

	        console.error(error);

	        alert("Unable to delete doctor.");

	    });

	}	function logout() {

	    if (confirm("Logout from VEDYA?")) {

	        localStorage.clear();

	        window.location.href = "login.html";

	    }

	}