const userId =
localStorage.getItem("userId");

let doctorId = "";

window.onload=function(){

    loadProfile();
}
function updateProfile() {

    let updatedDoctor = {

        doctorId: doctorId,

        doctorName: document.getElementById("doctorName").value,

        specialization: document.getElementById("specialization").value,

        experienceYears: document.getElementById("experienceYears").value,

        consultationFee: document.getElementById("consultationFee").value

    };

    fetch(`${API_URL}/doctors/${doctorId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedDoctor)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Failed to update profile");

        }

        return response.json();

    })

    .then(() => {

        alert("Profile updated successfully!");

    })

    .catch(error => {

        console.log(error);

        alert("Unable to update profile.");

    });

}
function loadProfile(){

    fetch(
    `${API_URL}/doctors/user/${userId}`)

    .then(res=>res.json())

    .then(d=>{

        doctorId=d.doctorId;

        document.getElementById(
        "doctorName").value=d.doctorName;

        document.getElementById(
        "specialization").value=d.specialization;

        document.getElementById(
        "experienceYears").value=d.experienceYears;

        document.getElementById(
        "consultationFee").value=d.consultationFee;
    });

}