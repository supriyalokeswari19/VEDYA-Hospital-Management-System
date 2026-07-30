const API_URL = "http://localhost:8080";

fetch(API_URL + "/doctors")

.then(response => response.json())

.then(doctors => {

    let container =
    document.getElementById("doctorContainer");

    container.innerHTML = "";

    doctors.forEach(doctor => {

		container.innerHTML += `

		<div class="doctor-card">

		    

		    <h3>${doctor.doctorName}</h3>

		    <span class="badge">
		        ${doctor.specialization}
		    </span>

		    

		    <p>
		        <i class="fa-solid fa-briefcase-medical"></i>
		        ${doctor.experienceYears}+ Years Experience
		    </p>

		    

		    <p class="fee">

		        Consultation Fee

		        <strong>

		        ₹${doctor.consultationFee}

		        </strong>

		    </p>

		    <a class="book-btn"
		       href="doctor-details.html?id=${doctor.doctorId}">

		        View Profile

		    </a>

		</div>

		`;
    });

})

.catch(error => {

    console.log(error);

    document.getElementById("doctorContainer").innerHTML =

    "<h2>Unable to load doctors.</h2>";

});