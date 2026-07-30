const API_URL =
"http://localhost:8080";

let userId =
localStorage.getItem("userId");

fetch(API_URL+
"/doctors/user/"+userId)

.then(r=>r.json())

.then(doctor=>{

return fetch(

API_URL+

"/appointments/doctor/"+

doctor.doctorId+

"/today");

})

.then(r=>r.json())

.then(data=>{

let container=

document.getElementById(
"appointmentContainer");

container.innerHTML="";

if(data.length===0){

container.innerHTML=

"<h2>No Appointments Today</h2>";

return;

}

data.forEach(a=>{

let statusClass="";

if(a.status==="Completed"){

    statusClass="completed";

}
else if(a.status==="Pending"){

    statusClass="pending";

}
else{

    statusClass="cancelled";

}

container.innerHTML+=`

<div class="appointment-card">

    <div class="appointment-left">

        <div class="appointment-icon">

            <i class="fa-solid fa-user-doctor"></i>

        </div>

        <div class="appointment-details">

            <h3>${a.patient.patientName}</h3>

            <p><b>Date:</b> ${a.appointmentDate}</p>

            <p><b>Time:</b> ${a.appointmentTime}</p>

        </div>

    </div>

    <div>

        <span class="status ${statusClass}">

            ${a.status}

        </span>

    </div>

</div>

`;

});

})

.catch(err=>{

console.log(err);

});