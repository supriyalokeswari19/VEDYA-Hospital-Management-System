const API_URL = "https://vedya-hospital-management-system.onrender.com";
window.onload = function () {

    loadCounts();

    loadAppointmentChart();

    loadRevenueChart();
};

function loadCounts() {

    fetch(`${API_URL}/doctors`)
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "doctorCount").innerText =
        data.length;
    });

    fetch(`${API_URL}/patients`)
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "patientCount").innerText =
        data.length;
    });

    fetch(`${API_URL}/appointments`)
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "appointmentCount").innerText =
        data.length;
    });

    fetch(`${API_URL}/bills`)
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "billCount").innerText =
        data.length;

        let total = 0;

        data.forEach(bill => {

            total += Number(bill.amount);
        });

        document.getElementById(
        "totalRevenue").innerText =
        "₹" + total;
    });
}

function loadAppointmentChart() {

    fetch(`${API_URL}/appointments/count`)

    .then(res => res.json())

    .then(data => {

        let labels =
        data.map(item =>
        "Doctor " + item.doctorId);

        let values =
        data.map(item =>
        item.appointmentCount);

        new Chart(

        document.getElementById(
        "appointmentChart"),

        {

            type:"bar",

            data:{

                labels:labels,

                datasets:[{

                    label:"Appointments",

                    data:values
                }]
            }
        });
    });
}

function loadRevenueChart() {

    fetch(`${API_URL}/appointments/revenue`)

    .then(res => res.json())

    .then(data => {

        let labels =
        data.map(item =>
        "Doctor " + item.doctorId);

        let values =
        data.map(item =>
        item.revenue);

		new Chart(
		document.getElementById("revenueChart"),
		{
		    type:"pie",

		    data:{
		        labels:labels,

		        datasets:[{
		            data:values
		        }]
		    },

		    options:{

		        responsive:true,

		        maintainAspectRatio:false
		    }
		});S
    });
}