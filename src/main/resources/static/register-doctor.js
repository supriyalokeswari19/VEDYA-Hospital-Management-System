const USER_API =
"http://localhost:8080/users";

const DOCTOR_API =
"http://localhost:8080/doctors";

document.getElementById("doctorForm")

.addEventListener("submit", registerDoctor);

function registerDoctor(e){

    e.preventDefault();

    let user={

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value,

        role:"DOCTOR"

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

        let doctor={

            doctorName:
            document.getElementById("name").value,

            userId:
            userData.userId,

            specialization:
            document.getElementById("specialization").value,

            experienceYears:
            document.getElementById("experience").value,

            consultationFee:
            document.getElementById("fee").value

        };

        return fetch(DOCTOR_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(doctor)

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