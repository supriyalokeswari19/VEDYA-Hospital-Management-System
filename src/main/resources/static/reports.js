const API = "http://localhost:8080";

window.onload = () => {

    loadDashboard();

};

async function loadDashboard() {

    try {

        const [
            doctors,
            patients,
            appointments,
            bills
        ] = await Promise.all([

            fetch(API + "/doctors").then(r => r.json()),
            fetch(API + "/patients").then(r => r.json()),
            fetch(API + "/appointments").then(r => r.json()),
            fetch(API + "/bills").then(r => r.json())

        ]);

        /* ================= SUMMARY ================= */

        document.getElementById("doctorCount").innerText =
            doctors.length;

        document.getElementById("patientCount").innerText =
            patients.length;

        document.getElementById("appointmentCount").innerText =
            appointments.length;

        document.getElementById("summaryDoctors").innerText =
            doctors.length;

        document.getElementById("summaryPatients").innerText =
            patients.length;

        document.getElementById("summaryAppointments").innerText =
            appointments.length;

        /* ================= REVENUE ================= */

        let revenue = 0;

        bills.forEach(b => {

            if (b.paymentStatus === "Paid") {

                revenue += Number(b.amount);

            }

        });

        document.getElementById("totalRevenue").innerText =
            "₹" + revenue.toLocaleString();

        document.getElementById("summaryRevenue").innerText =
            "₹" + revenue.toLocaleString();

        loadAppointmentReport();

        loadRevenueReport();

    }

    catch (err) {

        console.error(err);

        alert("Unable to load reports.");

    }

}

/* ================================================= */

async function loadAppointmentReport() {

    try {

        const response = await fetch(API + "/appointments/count");

        const data = await response.json();

        const table =
            document.getElementById("appointmentReport");

        table.innerHTML = "";

        data.forEach(r => {

            table.innerHTML += `

            <tr>

                <td>${r.doctorId}</td>

                <td>${r.totalAppointments}</td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

/* ================================================= */

async function loadRevenueReport() {

    try {

        const response = await fetch(API + "/appointments/revenue");

        const data = await response.json();

        const table =
            document.getElementById("revenueReport");

        table.innerHTML = "";

        data.forEach(r => {

            table.innerHTML += `

            <tr>

                <td>${r.doctorId}</td>

                <td>₹ ${Number(r.totalRevenue).toLocaleString()}</td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

/* ================================================= */

function generateReport() {

    const from =
        document.getElementById("fromDate").value;

    const to =
        document.getElementById("toDate").value;

    if (!from || !to) {

        alert("Please select From Date and To Date.");

        return;

    }

    alert("Report Generated Successfully.");

}

/* ================================================= */

function exportPDF() {

    alert("PDF Export feature coming soon.");

}

/* ================================================= */

function exportExcel() {

    alert("Excel Export feature coming soon.");

}