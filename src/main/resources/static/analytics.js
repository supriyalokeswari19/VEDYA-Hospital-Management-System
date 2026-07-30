window.onload = function () {

    loadCounts();

    loadAppointmentChart();

    loadRevenueChart();
};

function loadCounts() {

    fetch("http://localhost:8080/doctors")
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "doctorCount").innerText =
        data.length;
    });

    fetch("http://localhost:8080/patients")
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "patientCount").innerText =
        data.length;
    });

    fetch("http://localhost:8080/appointments")
    .then(res => res.json())
    .then(data => {

        document.getElementById(
        "appointmentCount").innerText =
        data.length;
    });

    fetch("http://localhost:8080/bills")
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

    fetch("http://localhost:8080/appointments/count")

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

    fetch("http://localhost:8080/appointments/revenue")

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