const params =
new URLSearchParams(window.location.search);

const doctorId =
params.get("doctorId");

if(!doctorId){

    showPopup(
        "warning",
        "Doctor Not Selected",
        "Please choose a doctor first."
    );

    setTimeout(() => {

        window.location.href =
        "index.html#doctors";

    },2000);

}


fetch(`${API_URL}/doctors/` + doctorId)

.then(response => response.json())

.then(doctor => {

   

    document.getElementById("doctorName").innerText =
    doctor.doctorName;

    document.getElementById("specialization").innerText =
    doctor.specialization;

    document.getElementById("consultationFee").innerText =
    "Consultation Fee : ₹ " +
    doctor.consultationFee;

})

.catch(error => {

    console.log(error);

});


document
.getElementById("appointmentForm")
.addEventListener("submit", function(event){

    event.preventDefault();
	let userId =
	localStorage.getItem("userId");

	fetch(`${API_URL}/patients/user/` + userId)

	.then(response => response.json())

	.then(patient => {

	    let appointment = {

	        patient:{

	            patientId: patient.patientId

	        },

	        doctorId: doctorId,

	        appointmentDate:
	        document.getElementById("appointmentDate").value,

	        appointmentTime:
	        document.getElementById("appointmentTime").value,

	        status: "Pending"

	    };

	    return fetch(
	        `${API_URL}/appointments`,{

	        method:"POST",

	        headers:{
	            "Content-Type":"application/json"
	        },

	        body:JSON.stringify(appointment)

	    });

	})

	.then(response=>{

	    if(!response.ok){

	        throw new Error("Booking Failed");

	    }

	    return response.json();

	})

	.then(data=>{

	    showPopup(
	        "success",
	        "Appointment Booked",
	        "Your appointment has been booked successfully."
	    );

	    setTimeout(()=>{

	        window.location.href =
	        "patient-dashboard.html";

	    },2000);

	})

	.catch(error=>{

	    showPopup(
	        "error",
	        "Booking Failed",
	        error.message
	    );

	});

});