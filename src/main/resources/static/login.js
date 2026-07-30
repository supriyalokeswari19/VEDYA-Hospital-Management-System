function login() {

    let email =
    document.getElementById(
    "email").value;

    let password =
    document.getElementById(
    "password").value;

    fetch("http://localhost:8080/login", {

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            email: email,

            password: password
        })
    })

    .then(response => {

        if(!response.ok){

            throw new Error(
            "Invalid Email or Password");
        }

        return response.json();
    })

    .then(data => {

        console.log(data);

        localStorage.setItem(
        "userId",
        data.userId);

        localStorage.setItem(
        "userRole",
        data.role);

        if(data.role === "ADMIN"){

            window.location.href =
            "admin.html";
        }

        else if(data.role === "DOCTOR"){

            window.location.href =
            "doctor-dashboard.html";
        }

		else if(data.role === "PATIENT"){

		    let selectedDoctor =
		    localStorage.getItem(
		    "selectedDoctor");

		    if(selectedDoctor){

		        localStorage.removeItem(
		        "selectedDoctor");

		        window.location.href =
		        "book-appointment.html?doctorId="
		        + selectedDoctor;

		    }

		    else{

		        window.location.href =
		        "patient-dashboard.html";

		    }

		}
        else{

            alert("Unknown Role");
        }
    })

    .catch(error => {

		showPopup(
		    "error",
		    "Login Failed",
		    error.message
		);

        console.log(error);
    });
}
function logout(){

    localStorage.clear();

    window.location.href =
    "login.html";
}