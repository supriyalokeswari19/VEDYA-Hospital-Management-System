const USER_API =
"https://vedya-hospital-management-system.onrender.com/users";

const PATIENT_API =
"https://vedya-hospital-management-system.onrender.com/patients";

document.getElementById("patientForm")

.addEventListener("submit", registerPatient);

function registerPatient(e){

    e.preventDefault();

    let user={

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value,

        role:"PATIENT"

    };

    fetch(USER_API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    })

    .then(res=>res.json())

    .then(userData=>{

        let patient={

            patientName:
            document.getElementById("name").value,

            userId:
            userData.userId,

            age:
            document.getElementById("age").value,

            gender:
            document.getElementById("gender").value,

            phone:
            document.getElementById("phone").value,

            address:
            document.getElementById("address").value,

            bloodGroup:
            document.getElementById("bloodGroup").value

        };

        return fetch(PATIENT_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(patient)

        });

    })

    .then(res=>res.json())

    .then(()=>{

        alert(
"Registration Successful!\n\nWaiting for Admin Approval.");

        window.location.href="login.html";

    })

    .catch(err=>{

        console.log(err);

        alert("Registration Failed");

    });

}