document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.getElementById("dashboard");
    const customer = document.getElementById("customer");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const customerBtn = document.getElementById("customer-btn");
    const customerForm = document.getElementById("customer-form");
    const customerTableBody = document.getElementById("customer-table-body");

    // Load customers from local storage
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Navigation toggle
    dashboardBtn.addEventListener("click", () => {
        dashboard.classList.remove("hidden");
        customer.classList.add("hidden");
    });

    customerBtn.addEventListener("click", () => {
        dashboard.classList.add("hidden");
        customer.classList.remove("hidden");
    });

    customerForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission

        // Get form values
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Create customer object
        const customer = { firstname, lastname, email, phone };
        customers.push(customer); // Add the new customer to the array
        updateCustomerTable(); // Refresh the table with updated data
        customerForm.reset(); // Clear the form

        // Save customers to local storage
        localStorage.setItem("customers", JSON.stringify(customers));
    });

    // Update the customer table dynamically
    function updateCustomerTable() {
        customerTableBody.innerHTML = ""; // Clear existing rows
        customers.forEach((customer, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.firstname}</td>
                <td>${customer.lastname}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer(${index})">Edit</button>
                    <button onclick="deleteCustomer(${index})">Delete</button>
                </td>
            `;
            customerTableBody.appendChild(row);
        });
    }

    // Edit customer functionality
    window.editCustomer = (index) => {
        const customer = customers[index];
        document.getElementById("firstname").value = customer.firstname;
        document.getElementById("lastname").value = customer.lastname;
        document.getElementById("email").value = customer.email;
        document.getElementById("phone").value = customer.phone;

        customers.splice(index, 1); // Remove the selected customer
        updateCustomerTable(); // Refresh the table

        // Update local storage after editing
        localStorage.setItem("customers", JSON.stringify(customers));
    };

    // Delete customer functionality
    window.deleteCustomer = (index) => {
        customers.splice(index, 1); // Remove the selected customer
        updateCustomerTable(); // Refresh the table

        // Update local storage after deletion
        localStorage.setItem("customers", JSON.stringify(customers));
    };

    // Initial load of customers from local storage
    updateCustomerTable();
});
// Function to filter the table based on search input
function filterTable() {
  const input = document.getElementById("filterInput");
  const filter = input.value.trim().toLowerCase();
  const rows = document.querySelectorAll(".briefs-table tbody tr");

  rows.forEach((row) => {
    const name = row.querySelector("td:nth-child(1)").textContent.trim().toLowerCase(); // First Name column
    if (name.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Function to sort the table based on dropdown selection
function applyFilter() {
  const dropdown = document.getElementById("filterDropdown");
  const option = dropdown.value;
  const rows = Array.from(document.querySelectorAll(".briefs-table tbody tr"));

  rows.sort((a, b) => {
    const cellA = a.querySelector("td:nth-child(1)").textContent.trim().toLowerCase(); // First Name column
    const cellB = b.querySelector("td:nth-child(1)").textContent.trim().toLowerCase(); // First Name column
    return option === "asc" ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
  });

  const tbody = document.querySelector(".briefs-table tbody");
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}

// Add event listeners for search and filter
document.addEventListener("DOMContentLoaded", () => {
  const filterInput = document.getElementById("filterInput");
  const filterDropdown = document.getElementById("filterDropdown");

  if (filterInput) {
    filterInput.addEventListener("input", filterTable);
  }

  if (filterDropdown) {
    filterDropdown.addEventListener("change", applyFilter);
  }
});

