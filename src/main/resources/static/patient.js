const API_URL = "http://localhost:8080/patients";

window.onload = function () {
    loadPatients();
};

function loadPatients() {

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        let table =
            document.getElementById("patientTable");

        table.innerHTML = "";

		data.forEach(patient => {

		    let row = `

		    <tr>

		        <td>${patient.patientId}</td>

		        <td>${patient.patientName}</td>

		        <td>${patient.age}</td>

		        <td>${patient.gender}</td>

		        <td>${patient.phone}</td>

		        <td>${patient.bloodGroup}</td>

		        <td>

		            <button
		                class="edit-btn"
		                onclick="editPatient(${patient.patientId})">

		                 Edit

		            </button>

		            <button
		                class="delete-btn"
		                onclick="deletePatient(${patient.patientId})">

		                 Delete

		            </button>

		        </td>

		    </tr>

		    `;

		    table.innerHTML += row;

		});

    })

    .catch(error =>
        console.log(error));
}
function searchPatient() {

    let value =
    document.getElementById(
    "searchPatient").value.toLowerCase();

    let rows =
    document.querySelectorAll(
    "#patientTable tr");

    rows.forEach(row => {

        row.style.display =
        row.innerText.toLowerCase()
        .includes(value)

        ? ""

        : "none";
    });
}
function savePatient() {

    let id = document.getElementById("patientId").value;

    let patient = {

        patientName: document.getElementById("patientName").value.trim(),

        userId: document.getElementById("userId").value,

        age: document.getElementById("age").value,

        gender: document.getElementById("gender").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        address: document.getElementById("address").value.trim(),

        bloodGroup: document.getElementById("bloodGroup").value.trim()

    };

    // Validation

    if (
        patient.patientName === "" ||
        patient.userId === "" ||
        patient.age === "" ||
        patient.gender === "" ||
        patient.phone === "" ||
        patient.address === "" ||
        patient.bloodGroup === ""
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

        body: JSON.stringify(patient)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save patient.");

        }

        return response.json();

    })

    .then(data => {

        alert(id === ""
            ? "Patient added successfully."
            : "Patient updated successfully.");

        loadPatients();

        // Reset Form

        document.getElementById("patientId").value = "";

        document.getElementById("patientName").value = "";

        document.getElementById("userId").value = "";

        document.getElementById("age").value = "";

        document.getElementById("gender").value = "";

        document.getElementById("phone").value = "";

        document.getElementById("address").value = "";

        document.getElementById("bloodGroup").value = "";

    })

    .catch(error => {

        console.error(error);

        alert("Unable to save patient.");

    });

}
function editPatient(id) {

    fetch(API_URL + "/" + id)

    .then(response => response.json())

    .then(patient => {

        document.getElementById(
        "patientId").value =
        patient.patientId;

        document.getElementById(
        "patientName").value =
        patient.patientName;

        document.getElementById(
        "userId").value =
        patient.userId;

        document.getElementById(
        "age").value =
        patient.age;

        document.getElementById(
        "gender").value =
        patient.gender;

        document.getElementById(
        "phone").value =
        patient.phone;

        document.getElementById(
        "address").value =
        patient.address;

        document.getElementById(
        "bloodGroup").value =
        patient.bloodGroup;
    });
}

function deletePatient(id){

    if(!confirm("Delete this patient?")){

        return;

    }

    fetch(API_URL + "/" + id,{

        method:"DELETE"

    })

    .then(response=>response.text())

    .then(message=>{

        alert(message);

        loadPatients();

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to delete patient.");

    });

}