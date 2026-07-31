const params = new URLSearchParams(window.location.search);

const doctorId = params.get("id");
const API_URL = "https://vedya-hospital-management-system.onrender.com";

fetch(`${API_URL}/doctors/` + doctorId)

.then(response => {

    if (!response.ok) {

        throw new Error("Doctor Not Found");

    }

    return response.json();

})

.then(doctor => {

    

    document.getElementById("doctorName").innerText =
        doctor.doctorName;

    document.getElementById("qualification").innerText =
        doctor.qualification;

    document.getElementById("specialization").innerText =
        doctor.specialization;

    document.getElementById("experience").innerHTML =
        "⭐ " + doctor.experienceYears + "+ Years Experience";

   
    document.getElementById("consultationFee").innerHTML =
        "₹ " + doctor.consultationFee;

})

.catch(error => {

    console.error(error);

    document.querySelector(".doctor-card").innerHTML =

    "<h2>Doctor Not Found</h2>";

});


document
.getElementById("bookAppointmentBtn")
.addEventListener("click", bookAppointment);


function bookAppointment(){

    let role =
    localStorage.getItem("userRole");

    if(role == null){

        localStorage.setItem(
            "selectedDoctor",
            doctorId
        );

        window.location.href =
        "login.html";

        return;
    }

    if(role === "PATIENT"){

        window.location.href =
        "book-appointment.html?doctorId=" +
        doctorId;

        return;
    }

    showPopup(
        "warning",
        "Access Denied",
        "Only patients can book appointments."
    );

}