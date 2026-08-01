const API_URL = "https://vedya-hospital-management-system.onrender.com";
const userId = localStorage.getItem("userId");

let patientId = "";

window.onload = function () {

    loadProfile();
};

function loadProfile() {

    fetch(`${API_URL}/patients/user/${userId}`)

    .then(response => response.json())

    .then(data => {

        patientId = data.patientId;

        document.getElementById("patientName").value = data.patientName;
        document.getElementById("age").value = data.age;
        document.getElementById("gender").value = data.gender;
        document.getElementById("phone").value = data.phone;
        document.getElementById("address").value = data.address;
        document.getElementById("bloodGroup").value = data.bloodGroup;

    });

}

function updateProfile() {

    let patient = {

        patientName: document.getElementById("patientName").value,
        userId: userId,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        bloodGroup: document.getElementById("bloodGroup").value
    };

    fetch(`${API_URL}/patients/${patientId}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(patient)

    })

    .then(response => response.json())

    .then(data => {

        alert("Profile Updated Successfully");

    });

}