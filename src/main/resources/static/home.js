const API_URL = "https://your-render-app.onrender.com";

window.onload = loadDoctors;

function loadDoctors(){

fetch(API_URL + "/doctors")

.then(res=>res.json())

.then(doctors=>{

let output="";

doctors.slice(0,3).forEach(doctor => {
output+=`

<div class="doctor-card">

<img src="img/doctors/${doctor.photo || 'default-doctor.jpg'}">

<h3>${doctor.doctorName}</h3>

<h5>${doctor.qualification}</h5>

<p class="specialization">

${doctor.specialization}

</p>

<p class="experience">

⭐ ${doctor.experienceYears}+ Years Experience

</p>

<p class="availability">

🕒 ${doctor.availability}

</p>

<p class="fee">

💰 ₹${doctor.consultationFee}

</p>

<a href="doctor-details.html?id=${doctor.doctorId}">
View Profile
</a>

</div>

`;

});

document.getElementById("doctorContainer").innerHTML=output;

})

.catch(err=>{

console.log(err);

document.getElementById("doctorContainer").innerHTML=

"<h3>No Doctors Available</h3>";

});

}
window.addEventListener("scroll",function(){

    const nav=document.querySelector("nav");

    if(window.scrollY>50){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }

});
