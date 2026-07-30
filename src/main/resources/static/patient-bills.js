const API_URL =
"http://localhost:8080";

let userId =
localStorage.getItem(
"userId");

fetch(API_URL+
"/patients/user/"+userId)

.then(r=>r.json())

.then(patient=>{

return fetch(

API_URL+

"/bills/patient/"+

patient.patientId);

})

.then(r=>r.json())

.then(data=>{

let container=

document.getElementById(
"billContainer");

container.innerHTML="";

if(data.length==0){

container.innerHTML=

"<h3>No Bills Found</h3>";

return;

}
console.log(data);
data.forEach(b=>{
	let statusClass = "";

	if(b.status === "PAID"){

	    statusClass = "paid";

	}
	else if(b.status === "PENDING"){

	    statusClass = "pending";

	}
	else{

	    statusClass = "unpaid";

	}

	container.innerHTML += `

	<div class="bill-card">

	    <div class="bill-left">

	        <div class="bill-icon">

	            <i class="fa-solid fa-file-invoice-dollar"></i>

	        </div>

	        <div class="bill-details">

	            <h3>Bill #${b.billId}</h3>

	            <p><b>Date:</b> ${b.billDate}</p>

	            <p><b>Payment Status:</b> ${b.paymentStatus}</p>
	        </div>

	    </div>

	    <div class="bill-right">

	        <span class="amount">

	            ₹${b.amount}

	        </span>

	        <span class="payment-status ${statusClass}">

	            ${b.paymentStatus}

	        </span>

	    </div>

	</div>

	`;

});

})

.catch(error=>{

console.log(error);

});