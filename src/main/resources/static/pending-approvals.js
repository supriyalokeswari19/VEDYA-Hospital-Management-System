const API =
"https://vedya-hospital-management-system.onrender.com/users/pending";

window.onload = function () {

    loadPendingUsers();
};

function loadPendingUsers() {

    fetch(API)

    .then(response => response.json())

    .then(data => {

        let table =
        document.getElementById(
        "pendingTable");

        table.innerHTML = "";

        data.forEach(user => {

            table.innerHTML += `

            <tr>

                <td>${user.userId}</td>

                <td>${user.name}</td>

                <td>${user.email}</td>

                <td>${user.role}</td>

                <td>${user.status}</td>

                <td>

                    <button
                    onclick="approveUser(${user.userId})">

                    Approve

                    </button>

                    <button
                    onclick="rejectUser(${user.userId})">

                    Reject

                    </button>

                </td>

            </tr>

            `;
        });
    });
}

function approveUser(id){

    fetch(
    `${API_URL}/users/approve/${id}`,

    {
        method:"PUT"
    })

    .then(() => {

        loadPendingUsers();
    });
}

function rejectUser(id){

    fetch(
    `${API_URL}/users/reject/${id}`,

    {
        method:"PUT"
    })

    .then(() => {

        loadPendingUsers();
    });
}