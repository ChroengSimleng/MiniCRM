document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.getElementById("dashboard");
    const customer = document.getElementById("customer");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const customerBtn = document.getElementById("customer-btn");
    const customerForm = document.getElementById("customer-form");
    const customerTableBody = document.getElementById("customer-table-body");
    const filterInputCustomer = document.getElementById("filterInputCustomer");
    const filterDropdownCustomer = document.getElementById("filterDropdownCustomer");

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
        applyFilter(); // Apply filter after updating the table
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

    // Function to filter the table based on search input
    filterInputCustomer.addEventListener("input", () => {
        applyFilter();
    });

    // Function to sort the table based on dropdown selection
    filterDropdownCustomer.addEventListener("change", () => {
        applyFilter();
    });

    function applyFilter() {
        const filterValue = filterInputCustomer.value.trim().toLowerCase();
        const sortOrder = filterDropdownCustomer.value;
        
        let filteredCustomers = customers.filter(customer => {
            return customer.firstname.toLowerCase().includes(filterValue) || 
                   customer.lastname.toLowerCase().includes(filterValue);
        });

        if (sortOrder === "asc") {
            filteredCustomers.sort((a, b) => a.firstname.localeCompare(b.firstname));
        } else if (sortOrder === "desc") {
            filteredCustomers.sort((a, b) => b.firstname.localeCompare(a.firstname));
        }

        // Update the table with filtered and sorted customers
        customerTableBody.innerHTML = ""; // Clear existing rows
        filteredCustomers.forEach((customer, index) => {
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

    // Graph code (unchanged)
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar', // You can change this to 'bar', 'pie', 'line', etc.
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
            datasets: [{
                label: 'Sales Data',
                data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
