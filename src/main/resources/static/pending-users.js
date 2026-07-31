const API =
"https://vedya-hospital-management-system.onrender.com/users/pending";

loadUsers();

function loadUsers(){

fetch(API)

.then(res=>res.json())

.then(data=>{

let table=

document.getElementById(
"pendingTable");

table.innerHTML="";

data.forEach(user=>{

table.innerHTML+=`

<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.role}</td>

<td>${user.status}</td>

<td>

<button
class="approve"
onclick="approve(${user.userId})">

Approve

</button>

<button
class="reject"
onclick="rejectUser(${user.userId})">

Reject

</button>

</td>

</tr>

`;

});

});

}

function approve(id){

fetch(

"${API_URL}/users/approve/"+id,

{

method:"PUT"

})

.then(()=>{

alert("User Approved");

loadUsers();

});

}

function rejectUser(id){

fetch(

"`{API_URL}/users/reject/`+id,

{

method:"PUT"

})

.then(()=>{

alert("User Rejected");

loadUsers();

});

}