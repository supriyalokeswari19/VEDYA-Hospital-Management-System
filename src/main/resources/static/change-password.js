const API_URL =
"http://localhost:8080";

function changePassword(){

let currentPassword=
document.getElementById(
"currentPassword").value;

let newPassword=
document.getElementById(
"newPassword").value;

let confirmPassword=
document.getElementById(
"confirmPassword").value;

if(newPassword!==confirmPassword){

alert(
"Passwords do not match");

return;

}

let userId=
localStorage.getItem(
"userId");

fetch(

API_URL+

"/users/change-password?userId="+

userId+

"&currentPassword="+

encodeURIComponent(currentPassword)+

"&newPassword="+

encodeURIComponent(newPassword),

{

method:"PUT"

}

)

.then(r=>{

if(!r.ok){

throw new Error(
"Current Password is Incorrect");

}

return r.text();

})

.then(msg=>{

alert(msg);

localStorage.clear();

window.location.href=
"login.html";

})

.catch(err=>{

alert(err.message);

});

}