const API_URL =
"https://your-render-app.onrender.com";

let userId =
localStorage.getItem("userId");

fetch(API_URL+
"/patients/user/"+userId)

.then(r=>r.json())

.then(patient=>{

return fetch(

API_URL+

"/appointments/patient/"+

patient.patientId);

})

.then(r=>r.json())

.then(appointments=>{

let ids=[];

appointments.forEach(a=>{

ids.push(a.appointmentId);

});

if(ids.length==0){

document.getElementById(
"prescriptionContainer")
.innerHTML=

"<h3>No Prescriptions Found</h3>";

return;

}

return fetch(

API_URL+

"/prescriptions/appointments?appointmentIds="+

ids.join("&appointmentIds=")

);

})

.then(r=>{

if(!r)return;

return r.json();

})

.then(data=>{

if(!data)return;

let container=

document.getElementById(
"prescriptionContainer");

container.innerHTML="";

if(data.length==0){

container.innerHTML=

"<h3>No Prescriptions Found</h3>";

return;

}

data.forEach(p=>{

	container.innerHTML += `

	<div class="prescription-card">

	    <div class="prescription-left">

	        <div class="prescription-icon">

	            <i class="fa-solid fa-capsules"></i>

	        </div>

	        <div class="prescription-details">

	            <h3>${p.medicine}</h3>

	            <p><b>Dosage:</b> ${p.dosage}</p>

	            <p><b>Instructions:</b> ${p.instructions}</p>

	        </div>

	    </div>

	    <div class="prescription-right">

	        <span class="medicine-badge">

	            Medicine

	        </span>

	    </div>

	</div>

	`;

});

})

.catch(error=>{

console.log(error);

});