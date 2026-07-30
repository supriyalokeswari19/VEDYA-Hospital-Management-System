const API_URL =
"http://localhost:8080";

window.onload = function(){

    loadSchedule();

};

function loadSchedule(){

    let userId =
    localStorage.getItem("userId");

    fetch(API_URL +
    "/doctors/user/" +
    userId)

    .then(response=>response.json())

    .then(doctor=>{

        document.getElementById(
        "doctorName").innerHTML =
        "👨🏻‍⚕️  " +
        doctor.doctorName;

		document.getElementById("scheduleContent").innerHTML = `

		<div class="schedule-box">

		    

		    <span class="status">

		        Available

		    </span>

		</div>

		<div class="schedule-box">

		    <div class="schedule-info">

		        <h3>Specialization</h3>

		        <p>${doctor.specialization}</p>

		    </div>

		</div>

		`;

    })

    .catch(error=>{

        console.log(error);

    });

}

if(localStorage.getItem(
"userRole")!=="DOCTOR"){

    window.location.href="login.html";

}