const API_URL =
"https://vedya-hospital-management-system.onrender.com/medical-records";

window.onload = function () {

    loadMedicalRecords();
};

function loadMedicalRecords() {

	fetch(API_URL)
	.then(response => response.json())
	.then(data => {

	    console.log(data);

	    let table =
	    document.getElementById("medicalRecordTable");

	    table.innerHTML = "";

		data.forEach(m => {

		    console.log(m);

		    let row = `
		    <tr>
		    <td>${m.recordId}</td>
		    <td>${m.patientId}</td>
		    <td>${m.doctorId}</td>
		    <td>${m.diagnosis}</td>
		    <td>${m.prescription}</td>
		    <td>${m.visitDate}</td>
		    <td>
		    <button onclick="editMedicalRecord(${m.recordId})">Edit</button>
		    <button onclick="deleteMedicalRecord(${m.recordId})">Delete</button>
		    </td>
		    </tr>
		    `;

		    table.innerHTML += row;
		});

		})
		.catch(error => {

		    console.log(error);
		});
}

function saveMedicalRecord() {

    let id =
    document.getElementById(
    "recordId").value;

    let record = {

        patientId:
        document.getElementById(
        "patientId").value,

        doctorId:
        document.getElementById(
        "doctorId").value,

        diagnosis:
        document.getElementById(
        "diagnosis").value,

        prescription:
        document.getElementById(
        "prescription").value,

        visitDate:
        document.getElementById(
        "visitDate").value
    };

    if(id === "") {

        fetch(API_URL, {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(record)

        })

        .then(response => response.json())

        .then(data => {

            alert(
            "Medical Record Added Successfully");

            loadMedicalRecords();
        });

    } else {

        fetch(API_URL + "/" + id, {

            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(record)

        })

        .then(response => response.json())

        .then(data => {

            alert(
            "Medical Record Updated Successfully");

            loadMedicalRecords();

            document.getElementById(
            "recordId").value = "";
        });
    }
}

function editMedicalRecord(id) {

    fetch(API_URL + "/" + id)

    .then(response => response.json())

    .then(m => {

        document.getElementById(
        "recordId").value =
        m.recordId;

        document.getElementById(
        "patientId").value =
        m.patientId;

        document.getElementById(
        "doctorId").value =
        m.doctorId;

        document.getElementById(
        "diagnosis").value =
        m.diagnosis;

        document.getElementById(
        "prescription").value =
        m.prescription;

        document.getElementById(
        "visitDate").value =
        m.visitDate;
    });
}

function deleteMedicalRecord(id) {

    fetch(API_URL + "/" + id, {

        method:"DELETE"
    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        loadMedicalRecords();
    });
}