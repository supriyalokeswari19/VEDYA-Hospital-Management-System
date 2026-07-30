const API_URL =
"http://localhost:8080/prescriptions";

window.onload = function() {
    loadPrescriptions();
};

function loadPrescriptions() {

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        let table =
        document.getElementById(
        "prescriptionTable");

        table.innerHTML = "";

        data.forEach(p => {

			let row = `
			<tr>

			<td>${p.prescriptionId}</td>

			<td>${p.appointmentId}</td>

			<td>${p.medicine}</td>

			<td>${p.dosage}</td>

			<td>${p.instructions}</td>

			<td>

			<button class="edit-btn"
			onclick="editPrescription(${p.prescriptionId})">

			 Edit

			</button>

			<button class="delete-btn"
			onclick="deletePrescription(${p.prescriptionId})">

			 Delete

			</button>

			</td>

			</tr>
			`;

            table.innerHTML += row;
        });
    });
}

function savePrescription() {

    let id =
    document.getElementById(
    "prescriptionId").value;

    let prescription = {

        appointmentId:
        document.getElementById(
        "appointmentId").value,

        medicine:
        document.getElementById(
        "medicine").value,

        dosage:
        document.getElementById(
        "dosage").value,

        instructions:
        document.getElementById(
        "instructions").value
    };

    if(id===""){
		console.log(API_URL);
		console.log(JSON.stringify(prescription));
        fetch("http://localhost:8080/prescriptions",{
            method:"POST",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify(
            prescription)
        })

        .then(r=>r.json())

        .then(data=>{

            alert(
            "Prescription Added");

            loadPrescriptions();
        });

    }else{

        fetch(API_URL+"/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify(
            prescription)
        })

        .then(r=>r.json())

        .then(data=>{

            alert(
            "Prescription Updated");

            loadPrescriptions();

            document.getElementById(
            "prescriptionId").value="";
        });
    }
}
function editPrescription(id){

    fetch(API_URL+"/"+id)

    .then(r=>r.json())

    .then(p=>{

        document.getElementById(
        "prescriptionId").value =
        p.prescriptionId;

        document.getElementById(
        "appointmentId").value =
        p.appointmentId;

        document.getElementById(
        "medicine").value =
        p.medicine;

        document.getElementById(
        "dosage").value =
        p.dosage;

        document.getElementById(
        "instructions").value =
        p.instructions;
    });
}

function deletePrescription(id){

    fetch(API_URL+"/"+id,{
        method:"DELETE"
    })

    .then(r=>r.text())

    .then(data=>{

        alert(data);

        loadPrescriptions();
    });
}