fetch("${API_URL}/dashboard")
.then(response => response.json())
.then(data => {

    document.getElementById("doctorCount")
        .innerText = data.totalDoctors;

    document.getElementById("patientCount")
        .innerText = data.totalPatients;

    document.getElementById("appointmentCount")
        .innerText = data.totalAppointments;
})
.catch(error => console.log(error));


fetch("${API_URL}/appointments/report")
.then(response => response.json())
.then(data => {

    let rows = "";

    data.forEach(report => {

        let statusClass = "";

        if(report.status.toLowerCase() === "completed"){
            statusClass = "completed";
        }
        else if(report.status.toLowerCase() === "scheduled"){
            statusClass = "scheduled";
        }

        rows += `
        <tr>
            <td>${report.appointmentId}</td>
            <td>${report.patientId}</td>
            <td>${report.doctorId}</td>
            <td>${report.specialization}</td>
            <td>
                <span class="${statusClass}">
                    ${report.status}
                </span>
            </td>
        </tr>
        `;
    });

    document.getElementById("reportTable").innerHTML = rows;
})
.catch(error => console.log(error));


function filterTable() {

    let filter =
        document.getElementById("statusFilter")
        .value
        .toLowerCase();

    let table =
        document.getElementById("reportTable");

    let rows =
        table.getElementsByTagName("tr");

    for(let i = 0; i < rows.length; i++) {

        let status =
            rows[i].getElementsByTagName("td")[4];

        if(status) {

            let text =
                status.textContent
                .trim()
                .toLowerCase();

            if(filter === "all" || text === filter){
                rows[i].style.display = "";
            }
            else{
                rows[i].style.display = "none";
            }
        }
    }
}