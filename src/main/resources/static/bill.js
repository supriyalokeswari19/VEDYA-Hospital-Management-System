const API_URL = "http://localhost:8080/bills";

window.onload = function () {

    loadBills();

};

// ================= LOAD BILLS =================

function loadBills() {

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        let table = document.getElementById("billTable");

        table.innerHTML = "";

        data.forEach(b => {

            let statusClass =
            b.paymentStatus === "Paid"
            ? "paid"
            : "pending";

            let row = `

            <tr>

                <td>${b.billId}</td>

                <td>${b.patientId}</td>

                <td>₹${b.amount}</td>

                <td>${b.billDate}</td>

                <td>

                    <span class="status ${statusClass}">

                        ${b.paymentStatus}

                    </span>

                </td>

                <td>

                    <button
                    class="edit-btn"
                    onclick="editBill(${b.billId})">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteBill(${b.billId})">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                    </button>

                </td>

            </tr>

            `;

            table.innerHTML += row;

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load bills.");

    });

}

// ================= SAVE BILL =================

function saveBill() {

    let id = document.getElementById("billId").value;

    let bill = {

        patientId:
        document.getElementById("patientId").value,

        amount:
        document.getElementById("amount").value,

        billDate:
        document.getElementById("billDate").value,

        paymentStatus:
        document.getElementById("paymentStatus").value

    };

    if (

        bill.patientId === "" ||

        bill.amount === "" ||

        bill.billDate === "" ||

        bill.paymentStatus === ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    let url = API_URL;

    let method = "POST";

    if (id !== "") {

        url = API_URL + "/" + id;

        method = "PUT";

    }

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(bill)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error();

        }

        return response.json();

    })

    .then(data => {

        alert(

            id === ""

            ? "Bill added successfully."

            : "Bill updated successfully."

        );

        loadBills();

        resetForm();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to save bill.");

    });

}

// ================= EDIT =================

function editBill(id) {

    fetch(API_URL + "/" + id)

    .then(response => response.json())

    .then(b => {

        document.getElementById("billId").value =
        b.billId;

        document.getElementById("patientId").value =
        b.patientId;

        document.getElementById("amount").value =
        b.amount;

        document.getElementById("billDate").value =
        b.billDate;

        document.getElementById("paymentStatus").value =
        b.paymentStatus;

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load bill.");

    });

}

// ================= DELETE =================

function deleteBill(id) {

    if (!confirm("Delete this bill?")) {

        return;

    }

    fetch(API_URL + "/" + id, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadBills();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to delete bill.");

    });

}

// ================= RESET FORM =================

function resetForm() {

    document.getElementById("billId").value = "";

    document.getElementById("patientId").value = "";

    document.getElementById("amount").value = "";

    document.getElementById("billDate").value = "";

    document.getElementById("paymentStatus").value = "Pending";

}