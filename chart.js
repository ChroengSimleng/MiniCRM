// chart.js
const ctx = document.getElementById('customerChart').getContext('2d');
const customerChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'line', 'pie', etc.
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Customers',
            data: [12, 19, 3, 5, 2, 3, 7], // Sample data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
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
